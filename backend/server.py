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

import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_enquiry_email(enquiry: Enquiry):
    smtp_host = os.environ.get("SMTP_HOST", "")
    smtp_port = int(os.environ.get("SMTP_PORT", "465"))
    smtp_user = os.environ.get("SMTP_USER", "")
    smtp_pass = os.environ.get("SMTP_PASSWORD", "")
    admin_email = os.environ.get("ADMIN_EMAIL", "admin@harvestgateoverseas.com")
    
    if not (smtp_host and smtp_user and smtp_pass):
        logging.warning("SMTP configuration missing or incomplete in backend/.env. Email not sent via SMTP.")
        return False
        
    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"[HarvestGate Export Enquiry] {enquiry.ref} · {enquiry.orgName} — {enquiry.product}"
        msg["From"] = f"HarvestGate Overseas <{smtp_user}>"
        msg["To"] = admin_email
        msg["Reply-To"] = f"{enquiry.name} <{enquiry.email}>"
        
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f6f4; margin: 0; padding: 24px; color: #1f2937; }}
            .container {{ max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }}
            .header {{ background: linear-gradient(135deg, #112417 0%, #1c3d28 100%); padding: 28px 24px; color: #ffffff; text-align: center; border-bottom: 3px solid #d4af37; }}
            .header h1 {{ margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 0.05em; color: #ffffff; }}
            .header p {{ margin: 6px 0 0 0; font-size: 12px; font-family: monospace; color: #d4af37; text-transform: uppercase; letter-spacing: 0.15em; }}
            .badge {{ display: inline-block; background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; color: #d4af37; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: bold; margin-top: 10px; }}
            .body {{ padding: 28px 24px; }}
            .table-wrap {{ width: 100%; border-collapse: collapse; margin-top: 16px; }}
            .table-wrap th, .table-wrap td {{ padding: 12px 14px; text-align: left; border-bottom: 1px solid #f3f4f6; font-size: 14px; }}
            .table-wrap th {{ background-color: #f9fafb; color: #4b5563; font-weight: 600; width: 35%; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; }}
            .table-wrap td {{ color: #111827; font-weight: 500; }}
            .highlight {{ color: #047857; font-weight: 700; }}
            .notes-box {{ background: #fdfbf7; border-left: 4px solid #d4af37; padding: 14px 16px; border-radius: 4px; margin-top: 20px; font-size: 13.5px; line-height: 1.6; }}
            .footer {{ background-color: #f9fafb; padding: 18px 24px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; }}
            .cta-btn {{ display: inline-block; background: #d4af37; color: #000000 !important; text-decoration: none; padding: 10px 24px; border-radius: 6px; font-weight: bold; font-size: 13px; margin-top: 20px; }}
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>HARVESTGATE OVERSEAS</h1>
              <p>Direct International Trade Desk Enquiry</p>
              <div class="badge">Reference ID: {enquiry.ref}</div>
            </div>
            
            <div class="body">
              <h2 style="font-size: 17px; margin-top: 0; color: #111827;">New Commercial Export Enquiry Received</h2>
              <p style="font-size: 13.5px; color: #4b5563; line-height: 1.5;">
                A prospective global buyer has submitted a formal trade enquiry via the official website.
              </p>

              <table class="table-wrap">
                <tr>
                  <th>Contact Person</th>
                  <td><strong>{enquiry.name}</strong></td>
                </tr>
                <tr>
                  <th>Company / Buyer</th>
                  <td>{enquiry.orgName}</td>
                </tr>
                <tr>
                  <th>Business Email</th>
                  <td><a href="mailto:{enquiry.email}" style="color: #047857;">{enquiry.email}</a></td>
                </tr>
                <tr>
                  <th>Phone / WhatsApp</th>
                  <td><a href="tel:{enquiry.contactNumber}" style="color: #047857;">{enquiry.contactNumber}</a></td>
                </tr>
                <tr>
                  <th>Commodity Required</th>
                  <td class="highlight">{enquiry.product}</td>
                </tr>
                <tr>
                  <th>Target Volume / Container</th>
                  <td><strong>{enquiry.quantity}</strong></td>
                </tr>
                <tr>
                  <th>Delivery Address / Port</th>
                  <td>{enquiry.orgAddress}</td>
                </tr>
              </table>

              {f'<div class="notes-box"><strong>Additional Buyer Specifications / Notes:</strong><br>{enquiry.message}</div>' if enquiry.message else ''}

              <div style="text-align: center;">
                <a href="mailto:{enquiry.email}?subject=Quotation%20for%20{enquiry.product}%20-%20Ref%20{enquiry.ref}" class="cta-btn">
                  Reply Directly to Buyer &rarr;
                </a>
              </div>
            </div>

            <div class="footer">
              <p style="margin: 0;">HarvestGate Overseas • Mig-14, Kanth Rd, Ashiyana Colony, Moradabad, UP, India - 244001</p>
              <p style="margin: 4px 0 0 0; font-family: monospace;">FSSAI & APEDA Certified Global Agro Export House</p>
            </div>
          </div>
        </body>
        </html>
        """
        
        msg.attach(MIMEText(html_content, "html"))
        
        if smtp_port == 465:
            context = ssl.create_default_context()
            with smtplib.SMTP_SSL(smtp_host, smtp_port, context=context, timeout=10) as server:
                server.login(smtp_user, smtp_pass)
                server.sendmail(smtp_user, [admin_email], msg.as_string())
        else:
            with smtplib.SMTP(smtp_host, smtp_port, timeout=10) as server:
                server.starttls()
                server.login(smtp_user, smtp_pass)
                server.sendmail(smtp_user, [admin_email], msg.as_string())
                
        logging.info(f"Successfully sent enquiry email via SMTP to {admin_email} for ref {enquiry.ref}")
        return True
    except Exception as e:
        logging.error(f"SMTP email sending failed: {e}")
        return False

# API routes
@api_router.get("/")
async def root():
    return {
        "status": "online",
        "service": "HarvestGate Backend API",
        "version": "1.0.0",
        "admin_email": "admin@harvestgateoverseas.com",
        "smtp_configured": bool(os.environ.get("SMTP_HOST") and os.environ.get("SMTP_PASSWORD"))
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
            
    # Send email via SMTP
    send_enquiry_email(enquiry_obj)
    
    logging.info(f"New export enquiry dispatched for admin@harvestgateoverseas.com: {enquiry_obj.ref} from {enquiry_obj.name} ({enquiry_obj.email}) for {enquiry_obj.product}")
    return enquiry_obj

@api_router.post("/test-smtp")
async def test_smtp():
    test_enquiry = Enquiry(
        name="Test Trade Buyer",
        orgName="HarvestGate Test Desk",
        orgAddress="Business Bay, Dubai, UAE",
        email="test@harvestgateoverseas.com",
        contactNumber="+91 8077078313",
        product="Popped Lotus Seeds / Phool Makhana 6+ Suta",
        quantity="1 x 20ft FCL (24 MT)",
        message="This is a test email confirming that your SMTP protocol is active and delivering emails directly to admin@harvestgateoverseas.com.",
    )
    success = send_enquiry_email(test_enquiry)
    if success:
        return {
            "status": "success",
            "message": "Test email sent successfully via SMTP to admin@harvestgateoverseas.com!",
            "ref": test_enquiry.ref
        }
    else:
        raise HTTPException(
            status_code=500,
            detail="Failed to send email via SMTP. Please verify SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASSWORD in backend/.env."
        )

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