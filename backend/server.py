from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone

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

class EnquiryCreate(BaseModel):
    name: str
    orgName: str
    orgAddress: str
    email: str
    contactNumber: str
    product: str
    quantity: str
    message: str = ""
    targetEmail: str = "admin@harvestgateoverseas.com"

class Enquiry(EnquiryCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    ref: str = Field(default_factory=lambda: f"HG-{str(uuid.uuid4())[:6].upper()}")
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# API routes
@api_router.get("/")
async def root():
    return {
        "status": "online",
        "service": "HarvestGate Backend API",
        "version": "1.0.0",
        "admin_email": "admin@harvestgateoverseas.com"
    }

@api_router.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

@api_router.post("/enquiry", response_model=Enquiry)
async def create_enquiry(input: EnquiryCreate):
    enquiry_obj = Enquiry(**input.model_dump())
    doc = enquiry_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    if db is not None:
        try:
            await db.enquiries.insert_one(doc)
        except Exception as e:
            logging.error(f"Failed to persist enquiry to MongoDB: {e}")
            
    logging.info(f"New export enquiry dispatched for admin@harvestgateoverseas.com: {enquiry_obj.ref} from {enquiry_obj.name} ({enquiry_obj.email}) for {enquiry_obj.product}")
    return enquiry_obj

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