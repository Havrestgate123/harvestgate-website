from fastapi import FastAPI, APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import time
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, field_validator
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from email_service import send_admin_notification, send_buyer_acknowledgement, is_configured as email_configured

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection configuration
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
db_name = os.environ.get('DB_NAME', 'harvestgate_db')

client = None
db = None

try:
    client = AsyncIOMotorClient(mongo_url, serverSelectionTimeoutMS=2000)
    db = client[db_name]
except Exception as e:
    logging.warning(f"MongoDB connection initialized with warning: {e}")

# Create the main app
app = FastAPI(title="HarvestGate API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# â”€â”€ Rate Limiting (in-memory, per IP) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
_RATE_LIMIT_WINDOW = 600   # 10 minutes
_RATE_LIMIT_MAX    = 5     # max submissions per window
_rate_store: dict = {}     # ip -> list of timestamps

def _check_rate_limit(ip: str) -> bool:
    """Returns True if allowed, False if rate-limited."""
    # Never rate-limit localhost/loopback IPs during local development and testing
    if ip in ("127.0.0.1", "::1", "localhost", "unknown"):
        return True

    now = time.time()
    window_start = now - _RATE_LIMIT_WINDOW
    times = [t for t in _rate_store.get(ip, []) if t > window_start]
    if len(times) >= _RATE_LIMIT_MAX:
        return False
    times.append(now)
    _rate_store[ip] = times
    return True

# â”€â”€ Field sanitization â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
_HTML_TAG_RE = re.compile(r"<[^>]+>")

def _sanitize(value: str, max_len: int = 500) -> str:
    """Strip HTML tags and truncate."""
    return _HTML_TAG_RE.sub("", value.strip())[:max_len]

_EMAIL_RE = re.compile(r"^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$")

# â”€â”€ Models â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

class EnquiryCreate(BaseModel):
    name: str
    orgName: str
    orgAddress: str
    email: str
    contactNumber: str
    product: str
    quantity: str
    message: str = ""
    ref: Optional[str] = None

    @field_validator("email")
    @classmethod
    def validate_email(cls, v: str) -> str:
        v = v.strip()
        if not _EMAIL_RE.match(v):
            raise ValueError("Invalid email address")
        return v

class Enquiry(EnquiryCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    ref: str = Field(default_factory=lambda: f"HG-{str(uuid.uuid4())[:6].upper()}")
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# ── API routes ─────────────────────────────────────────────────────────────────

@api_router.get("/")
async def root():
    return {
        "status": "online",
        "service": "HarvestGate Backend API",
        "version": "2.0.0",
        "admin_email": os.environ.get("MAIL_ADMIN_EMAIL", "admin@harvestgateoverseas.com"),
        "email_configured": email_configured(),
    }

@api_router.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

@api_router.post("/enquiry")
async def create_enquiry(request: Request, input: EnquiryCreate):
    # ── Rate limiting ──────────────────────────────────────────────────────────
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        client_ip = forwarded.split(",")[0].strip()
    elif request.client:
        client_ip = request.client.host
    else:
        client_ip = "unknown"

    if not _check_rate_limit(client_ip):
        logging.warning("Rate limit exceeded for IP: %s", client_ip)
        raise HTTPException(
            status_code=429,
            detail="Too many enquiries submitted. Please try again in 10 minutes."
        )

    # ── Sanitize inputs ────────────────────────────────────────────────────────
    data = input.model_dump()
    data["name"]          = _sanitize(data["name"], 100)
    data["orgName"]       = _sanitize(data["orgName"], 150)
    data["orgAddress"]    = _sanitize(data["orgAddress"], 300)
    data["contactNumber"] = _sanitize(data["contactNumber"], 30)
    data["product"]       = _sanitize(data["product"], 200)
    data["quantity"]      = _sanitize(data["quantity"], 100)
    data["message"]       = _sanitize(data.get("message", ""), 1000)

    ref_val = data.get("ref")
    if not ref_val or not str(ref_val).startswith("HG-"):
        ref_val = f"HG-{str(uuid.uuid4())[:6].upper()}"
    data["ref"] = ref_val

    enquiry_obj = Enquiry(**data)

    # ── Persist to MongoDB ──────────────────────────────────────────────────────
    doc = enquiry_obj.model_dump()
    doc["timestamp"] = doc["timestamp"].isoformat()
    if db is not None:
        try:
            await db.enquiries.insert_one(doc)
        except Exception as e:
            logging.error("Failed to persist enquiry to MongoDB: %s", e)

    # â”€â”€ Send emails via Brevo â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    admin_ok, admin_err  = send_admin_notification(enquiry_obj)
    buyer_ok, buyer_err  = send_buyer_acknowledgement(enquiry_obj)

    if not admin_ok:
        logging.error("Admin email failed for ref %s: %s", enquiry_obj.ref, admin_err)
    if not buyer_ok:
        logging.error("Buyer acknowledgement failed for ref %s: %s", enquiry_obj.ref, buyer_err)

    logging.info(
        "Enquiry %s | admin_email=%s | buyer_email=%s | from=%s (%s)",
        enquiry_obj.ref, admin_ok, buyer_ok, enquiry_obj.name, enquiry_obj.email
    )

    return {
        "success": True,
        "ref": enquiry_obj.ref,
        "email_sent": buyer_ok,
        "id": enquiry_obj.id,
        "timestamp": enquiry_obj.timestamp.isoformat(),
    }

@api_router.post("/test-email")
async def test_email():
    """Send a test email to the admin inbox to verify Brevo is working."""
    if not email_configured():
        raise HTTPException(
            status_code=503,
            detail="BREVO_API_KEY is not configured. Add it to backend/.env and restart."
        )
    admin_email = os.environ.get("MAIL_ADMIN_EMAIL", "admin@harvestgateoverseas.com")
    test_enquiry = Enquiry(
        name="Test Buyer",
        orgName="HarvestGate Test Desk",
        orgAddress="Business Bay, Dubai, UAE",
        email=admin_email,
        contactNumber="+91 8077078313",
        product="Popped Lotus Seeds / Phool Makhana 6+ Suta",
        quantity="1 x 20ft FCL (24 MT)",
        message="This is a test confirming Brevo email delivery is working for both admin and buyer.",
    )
    admin_ok, admin_err = send_admin_notification(test_enquiry)
    buyer_ok, buyer_err = send_buyer_acknowledgement(test_enquiry)
    return {
        "status": "done",
        "admin_email": {"sent": admin_ok, "error": admin_err or None},
        "buyer_email": {"sent": buyer_ok, "error": buyer_err or None},
        "ref": test_enquiry.ref,
    }

@api_router.get("/enquiries")
async def get_enquiries():
    if db is None:
        return []
    try:
        enquiries = await db.enquiries.find({}, {"_id": 0}).to_list(1000)
        return enquiries
    except Exception as e:
        logging.error(f"Failed to query enquiries: {e}")
        return []

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    if db is not None:
        try:
            await db.status_checks.insert_one(doc)
        except Exception as e:
            logging.error(f"Failed to persist status check to MongoDB: {e}")
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    if db is None:
        return []
    
    try:
        status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
        for check in status_checks:
            if isinstance(check.get('timestamp'), str):
                check['timestamp'] = datetime.fromisoformat(check['timestamp'])
        return status_checks
    except Exception as e:
        logging.error(f"Failed to query MongoDB: {e}")
        return []

# Include the router in the main app
app.include_router(api_router)

cors_origins_raw = os.environ.get('CORS_ORIGINS', 'http://localhost:3000,http://localhost:5173,*')
cors_origins = [origin.strip() for origin in cors_origins_raw.split(',') if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=cors_origins if cors_origins else ["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    if client:
        client.close()
