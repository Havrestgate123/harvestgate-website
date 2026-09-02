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
        msg["Subject"] = f"[HarvestGate Trade Desk] New Export Enquiry: {enquiry.ref} · {enquiry.orgName} — {enquiry.product}"
        msg["From"] = f"HarvestGate Overseas <{smtp_user}>"
        msg["To"] = admin_email
        msg["Reply-To"] = f"{enquiry.name} <{enquiry.email}>"
        
        html_content = f"""
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>Export Trade Enquiry</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f0f4f0; font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f0f4f0; padding: 25px 10px;">
            <tr>
              <td align="center">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 620px; background-color: #ffffff; border: 1px solid #d1dbd1; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.06);">
                  
                  <!-- HEADER -->
                  <tr>
                    <td align="center" style="background-color: #112417; padding: 30px 20px; border-bottom: 4px solid #d4af37;">
                      <table border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center" style="border: 1.5px solid #d4af37; background-color: #173622; padding: 8px 18px; border-radius: 8px;">
                            <span style="font-size: 20px; font-weight: 900; letter-spacing: 0.12em; color: #ffffff; text-transform: uppercase;">HARVEST<span style="color: #d4af37;">GATE</span></span>
                            <div style="font-size: 10.5px; font-family: Courier, monospace; color: #d4af37; letter-spacing: 0.22em; text-transform: uppercase; margin-top: 3px;">OVERSEAS PVT. LTD.</div>
                          </td>
                        </tr>
                      </table>
                      <div style="font-size: 13px; color: #e2e8f0; font-weight: bold; margin-top: 12px; text-transform: uppercase; letter-spacing: 0.08em;">
                        New Commercial Export Enquiry Received
                      </div>
                      <div style="margin-top: 10px;">
                        <span style="display: inline-block; background-color: #1d3d27; border: 1px solid #d4af37; color: #d4af37; padding: 4px 14px; border-radius: 20px; font-size: 11.5px; font-weight: bold; font-family: Courier, monospace;">
                          REF: {enquiry.ref}
                        </span>
                      </div>
                    </td>
                  </tr>

                  <!-- BODY -->
                  <tr>
                    <td style="padding: 28px 24px;">
                      <p style="font-size: 15px; color: #1f2937; margin: 0 0 16px 0; line-height: 1.5;">
                        A prospective global buyer has submitted an export requirement via the website trade portal:
                      </p>

                      <!-- SPECIFICATION TABLE -->
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; border: 1px solid #d1fae5; border-radius: 8px; overflow: hidden; margin: 18px 0; background-color: #ffffff;">
                        <tr style="background-color: #166534;">
                          <td colspan="2" style="padding: 10px 14px; color: #ffffff; font-size: 12px; font-weight: bold; font-family: Courier, monospace; text-transform: uppercase; letter-spacing: 0.1em;">
                            &#10003; Trade Enquiry Details
                          </td>
                        </tr>
                        <tr>
                          <td width="38%" style="padding: 10px 14px; background-color: #f0fdf4; border-bottom: 1px solid #e5e7eb; font-size: 12px; font-weight: bold; color: #166534; text-transform: uppercase; font-family: Courier, monospace;">Contact Person</td>
                          <td style="padding: 10px 14px; border-bottom: 1px solid #e5e7eb; font-size: 13.5px; font-weight: bold; color: #111827;">{enquiry.name}</td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 14px; background-color: #f0fdf4; border-bottom: 1px solid #e5e7eb; font-size: 12px; font-weight: bold; color: #166534; text-transform: uppercase; font-family: Courier, monospace;">Organisation / Buyer</td>
                          <td style="padding: 10px 14px; border-bottom: 1px solid #e5e7eb; font-size: 13.5px; font-weight: bold; color: #111827;">{enquiry.orgName}</td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 14px; background-color: #f0fdf4; border-bottom: 1px solid #e5e7eb; font-size: 12px; font-weight: bold; color: #166534; text-transform: uppercase; font-family: Courier, monospace;">Business Email</td>
                          <td style="padding: 10px 14px; border-bottom: 1px solid #e5e7eb; font-size: 13.5px; font-weight: bold; color: #047857;"><a href="mailto:{enquiry.email}" style="color: #047857; text-decoration: none;">{enquiry.email}</a></td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 14px; background-color: #f0fdf4; border-bottom: 1px solid #e5e7eb; font-size: 12px; font-weight: bold; color: #166534; text-transform: uppercase; font-family: Courier, monospace;">Phone / WhatsApp</td>
                          <td style="padding: 10px 14px; border-bottom: 1px solid #e5e7eb; font-size: 13.5px; font-weight: bold; color: #047857;"><a href="tel:{enquiry.contactNumber}" style="color: #047857; text-decoration: none;">{enquiry.contactNumber}</a></td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 14px; background-color: #f0fdf4; border-bottom: 1px solid #e5e7eb; font-size: 12px; font-weight: bold; color: #166534; text-transform: uppercase; font-family: Courier, monospace;">Commodity Required</td>
                          <td style="padding: 10px 14px; border-bottom: 1px solid #e5e7eb; font-size: 14px; font-weight: 800; color: #047857;">{enquiry.product}</td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 14px; background-color: #f0fdf4; border-bottom: 1px solid #e5e7eb; font-size: 12px; font-weight: bold; color: #166534; text-transform: uppercase; font-family: Courier, monospace;">Target Volume</td>
                          <td style="padding: 10px 14px; border-bottom: 1px solid #e5e7eb; font-size: 13.5px; font-weight: bold; color: #111827;">{enquiry.quantity}</td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 14px; background-color: #f0fdf4; font-size: 12px; font-weight: bold; color: #166534; text-transform: uppercase; font-family: Courier, monospace;">Delivery Address / Port</td>
                          <td style="padding: 10px 14px; font-size: 13.5px; font-weight: bold; color: #111827;">{enquiry.orgAddress}</td>
                        </tr>
                        {f'<tr><td style="padding: 10px 14px; background-color: #fef3c7; border-top: 1px solid #e5e7eb; font-size: 12px; font-weight: bold; color: #92400e; text-transform: uppercase; font-family: Courier, monospace;">Buyer Notes</td><td style="padding: 10px 14px; border-top: 1px solid #e5e7eb; font-size: 13px; color: #374151;">{enquiry.message}</td></tr>' if enquiry.message else ''}
                      </table>

                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 24px;">
                        <tr>
                          <td align="center">
                            <a href="mailto:{enquiry.email}?subject=Quotation%20for%20{enquiry.product}%20-%20Ref%20{enquiry.ref}" style="display: inline-block; background-color: #d4af37; color: #000000; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-weight: bold; font-size: 13.5px;">
                              Reply Directly to Buyer &rarr;
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- FOOTER -->
                  <tr>
                    <td align="center" style="background-color: #111827; padding: 20px; color: #9ca3af; font-size: 11px; line-height: 1.6;">
                      HarvestGate Overseas Pvt. Ltd. &bull; Mig-14, Kanth Rd, Ashiyana Colony, Moradabad, UP - 244001<br>
                      FSSAI &amp; APEDA Certified Global Agro Export House
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
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
                
        logging.info(f"Successfully sent admin enquiry email via SMTP to {admin_email} for ref {enquiry.ref}")
        return True
    except Exception as e:
        logging.error(f"SMTP admin email sending failed: {e}")
        return False

def send_buyer_acknowledgement_email(enquiry: Enquiry):
    smtp_host = os.environ.get("SMTP_HOST", "")
    smtp_port = int(os.environ.get("SMTP_PORT", "465"))
    smtp_user = os.environ.get("SMTP_USER", "")
    smtp_pass = os.environ.get("SMTP_PASSWORD", "")
    admin_email = os.environ.get("ADMIN_EMAIL", "admin@harvestgateoverseas.com")
    
    if not (smtp_host and smtp_user and smtp_pass and enquiry.email):
        logging.warning("SMTP configuration missing or buyer email empty. Buyer acknowledgement email skipped.")
        return False
        
    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"Export Inquiry Received · {enquiry.product} [Ref: {enquiry.ref}] — HarvestGate Overseas"
        msg["From"] = f"HarvestGate Overseas <{smtp_user}>"
        msg["To"] = f"{enquiry.name} <{enquiry.email}>"
        msg["Reply-To"] = f"HarvestGate Export Desk <{admin_email}>"
        
        html_content = f"""
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>Export Inquiry Acknowledgment</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f2f5f2; font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f2f5f2; padding: 25px 10px;">
            <tr>
              <td align="center">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 620px; background-color: #ffffff; border: 1px solid #c8d8c8; border-radius: 14px; overflow: hidden; box-shadow: 0 6px 20px rgba(0,0,0,0.07);">
                  
                  <!-- BRAND HEADER -->
                  <tr>
                    <td align="center" style="background-color: #112417; padding: 32px 20px; border-bottom: 4px solid #d4af37;">
                      <table border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center" style="border: 1.5px solid #d4af37; background-color: #173622; padding: 8px 20px; border-radius: 8px;">
                            <span style="font-size: 22px; font-weight: 900; letter-spacing: 0.12em; color: #ffffff; text-transform: uppercase;">HARVEST<span style="color: #d4af37;">GATE</span></span>
                            <div style="font-size: 10.5px; font-family: Courier, monospace; color: #d4af37; letter-spacing: 0.22em; text-transform: uppercase; margin-top: 3px;">OVERSEAS PVT. LTD.</div>
                          </td>
                        </tr>
                      </table>
                      <div style="font-size: 13px; color: #e2e8f0; font-weight: bold; margin-top: 12px; text-transform: uppercase; letter-spacing: 0.08em;">
                        Global Agro Export Trade Desk
                      </div>
                      <div style="margin-top: 10px;">
                        <span style="display: inline-block; background-color: #1d3d27; border: 1px solid #d4af37; color: #d4af37; padding: 4px 14px; border-radius: 20px; font-size: 11.5px; font-weight: bold; font-family: Courier, monospace;">
                          ENQUIRY REF: {enquiry.ref}
                        </span>
                      </div>
                    </td>
                  </tr>

                  <!-- BODY CONTENT -->
                  <tr>
                    <td style="padding: 30px 24px;">
                      <p style="font-size: 17px; font-weight: bold; color: #111827; margin: 0 0 12px 0;">
                        Dear {enquiry.name},
                      </p>
                      
                      <p style="font-size: 14.5px; line-height: 1.65; color: #374151; margin: 0 0 20px 0;">
                        Thank you for reaching out to <strong>HarvestGate Overseas</strong>. We have formally registered your commercial export enquiry on behalf of <strong>{enquiry.orgName}</strong>.
                      </p>

                      <!-- SPECIFICATION CARD -->
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; border: 1px solid #c7e6c7; border-radius: 8px; overflow: hidden; margin: 20px 0; background-color: #ffffff;">
                        <tr style="background-color: #166534;">
                          <td colspan="2" style="padding: 10px 14px; color: #ffffff; font-size: 12px; font-weight: bold; font-family: Courier, monospace; text-transform: uppercase; letter-spacing: 0.1em;">
                            &#10003; Logged Export Requirement Specifications
                          </td>
                        </tr>
                        <tr>
                          <td width="38%" style="padding: 10px 14px; background-color: #f0fdf4; border-bottom: 1px solid #e0eae0; font-size: 12px; font-weight: bold; color: #166534; text-transform: uppercase; font-family: Courier, monospace;">Reference ID</td>
                          <td style="padding: 10px 14px; border-bottom: 1px solid #e0eae0; font-size: 13.5px; font-weight: bold; color: #b45309; font-family: Courier, monospace;">{enquiry.ref}</td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 14px; background-color: #f0fdf4; border-bottom: 1px solid #e0eae0; font-size: 12px; font-weight: bold; color: #166534; text-transform: uppercase; font-family: Courier, monospace;">Requested Commodity</td>
                          <td style="padding: 10px 14px; border-bottom: 1px solid #e0eae0; font-size: 14.5px; font-weight: 800; color: #047857;">{enquiry.product}</td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 14px; background-color: #f0fdf4; border-bottom: 1px solid #e0eae0; font-size: 12px; font-weight: bold; color: #166534; text-transform: uppercase; font-family: Courier, monospace;">Target Volume</td>
                          <td style="padding: 10px 14px; border-bottom: 1px solid #e0eae0; font-size: 13.5px; font-weight: bold; color: #111827;">{enquiry.quantity}</td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 14px; background-color: #f0fdf4; border-bottom: 1px solid #e0eae0; font-size: 12px; font-weight: bold; color: #166534; text-transform: uppercase; font-family: Courier, monospace;">Destination / Address</td>
                          <td style="padding: 10px 14px; border-bottom: 1px solid #e0eae0; font-size: 13.5px; font-weight: bold; color: #111827;">{enquiry.orgAddress}</td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 14px; background-color: #f0fdf4; font-size: 12px; font-weight: bold; color: #166534; text-transform: uppercase; font-family: Courier, monospace;">Phone / WhatsApp</td>
                          <td style="padding: 10px 14px; font-size: 13.5px; font-weight: bold; color: #111827;">{enquiry.contactNumber}</td>
                        </tr>
                        {f'<tr><td style="padding: 10px 14px; background-color: #fef3c7; border-top: 1px solid #e0eae0; font-size: 12px; font-weight: bold; color: #92400e; text-transform: uppercase; font-family: Courier, monospace;">Special Notes</td><td style="padding: 10px 14px; border-top: 1px solid #e0eae0; font-size: 13px; color: #374151;">{enquiry.message}</td></tr>' if enquiry.message else ''}
                      </table>

                      <!-- ASSURANCE CALLOUT -->
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 22px 0; background-color: #fdfbf7; border-left: 4px solid #d4af37; border-top: 1px solid #f2ede4; border-right: 1px solid #f2ede4; border-bottom: 1px solid #f2ede4; border-radius: 4px;">
                        <tr>
                          <td style="padding: 14px 18px; font-size: 13.5px; line-height: 1.6; color: #4b5563;">
                            <strong style="color: #111827; font-size: 14px;">What happens next?</strong><br>
                            Our international merchandising desk is reviewing your container specifications and preparing the formal <strong>CIF/FOB quotation</strong>, packaging options, and certified quality parameters. A dedicated trade manager will connect with you within <strong>24 business hours</strong>.
                          </td>
                        </tr>
                      </table>

                      <!-- ACTION BUTTONS -->
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 25px;">
                        <tr>
                          <td align="center">
                            <p style="font-size: 11.5px; color: #6b7280; margin: 0 0 12px 0; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; font-family: Courier, monospace;">
                              Need Immediate Dispatch / Direct Trade Desk Support?
                            </p>
                            <table border="0" cellpadding="0" cellspacing="0">
                              <tr>
                                <td align="center" style="padding: 0 6px;">
                                  <a href="https://wa.me/918077078313?text=Hi%20HarvestGate,%20following%20up%20on%20Export%20Enquiry%20Ref%20{enquiry.ref}" target="_blank" style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 11px 22px; border-radius: 6px; font-weight: bold; font-size: 13px;">
                                    Chat on WhatsApp &rarr;
                                  </a>
                                </td>
                                <td align="center" style="padding: 0 6px;">
                                  <a href="mailto:{admin_email}?subject=Follow-up%20on%20Enquiry%20{enquiry.ref}" style="display: inline-block; background-color: #112417; color: #d4af37; text-decoration: none; padding: 11px 22px; border-radius: 6px; font-weight: bold; font-size: 13px; border: 1px solid #d4af37;">
                                    Direct Trade Desk &rarr;
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>

                  <!-- CERTIFICATIONS BANNER -->
                  <tr>
                    <td align="center" style="background-color: #edf5ed; border-top: 1px solid #d4e2d4; border-bottom: 1px solid #d4e2d4; padding: 12px 16px; font-size: 11px; font-family: Courier, monospace; color: #166534; font-weight: bold; letter-spacing: 0.08em;">
                      FSSAI CERTIFIED &bull; APEDA REGISTERED (AAICH2946R) &bull; 100% SORTEX CLEANED
                    </td>
                  </tr>

                  <!-- FOOTER -->
                  <tr>
                    <td align="center" style="background-color: #111827; padding: 24px 20px; color: #9ca3af; font-size: 11.5px; line-height: 1.7;">
                      <strong style="color: #ffffff; font-size: 12px;">HarvestGate Overseas Pvt. Ltd.</strong><br>
                      Registered Trade Facility: Mig-14, Kanth Rd, near Muskan Nursing Home, Ashiyana Colony, Harthala, Moradabad, Uttar Pradesh, India - 244001<br>
                      Phone/WhatsApp: +91 8077078313 &bull; Email: <a href="mailto:{admin_email}" style="color: #d4af37; text-decoration: none;">{admin_email}</a><br>
                      <span style="font-size: 10.5px; color: #6b7280;">Cultivated with Intent &bull; Shipped with Proof &bull; Global Agricultural Exports</span>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
        """
        
        msg.attach(MIMEText(html_content, "html"))
        
        if smtp_port == 465:
            context = ssl.create_default_context()
            with smtplib.SMTP_SSL(smtp_host, smtp_port, context=context, timeout=10) as server:
                server.login(smtp_user, smtp_pass)
                server.sendmail(smtp_user, [enquiry.email], msg.as_string())
        else:
            with smtplib.SMTP(smtp_host, smtp_port, timeout=10) as server:
                server.starttls()
                server.login(smtp_user, smtp_pass)
                server.sendmail(smtp_user, [enquiry.email], msg.as_string())
                
        logging.info(f"Successfully sent buyer acknowledgement email to {enquiry.email} for ref {enquiry.ref}")
        return True
    except Exception as e:
        logging.error(f"SMTP buyer acknowledgement email failed: {e}")
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
            
    # 1. Send Admin Notification Email
    send_enquiry_email(enquiry_obj)
    
    # 2. Send Buyer Acknowledgment Email
    send_buyer_acknowledgement_email(enquiry_obj)
    
    logging.info(f"New export enquiry dispatched for admin@harvestgateoverseas.com: {enquiry_obj.ref} from {enquiry_obj.name} ({enquiry_obj.email}) for {enquiry_obj.product}")
    return enquiry_obj

@api_router.post("/test-smtp")
async def test_smtp():
    test_enquiry = Enquiry(
        name="Test Trade Buyer",
        orgName="HarvestGate Test Desk",
        orgAddress="Business Bay, Dubai, UAE",
        email=os.environ.get("ADMIN_EMAIL", "admin@harvestgateoverseas.com"),
        contactNumber="+91 8077078313",
        product="Popped Lotus Seeds / Phool Makhana 6+ Suta",
        quantity="1 x 20ft FCL (24 MT)",
        message="This is a test email confirming that both Admin and Buyer Auto-Responder SMTP emails are working seamlessly.",
    )
    admin_success = send_enquiry_email(test_enquiry)
    buyer_success = send_buyer_acknowledgement_email(test_enquiry)
    if admin_success or buyer_success:
        return {
            "status": "success",
            "message": f"Test emails dispatched successfully! Admin Notification: {'Sent' if admin_success else 'Failed'}, Buyer Auto-Responder: {'Sent' if buyer_success else 'Failed'}",
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