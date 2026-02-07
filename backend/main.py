from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, validator
from typing import Optional, List
import os
from dotenv import load_dotenv
from groq import Groq
from twilio.rest import Client
from datetime import datetime, timedelta
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.date import DateTrigger
import re
from database import SessionLocal, init_db, Note
from sqlalchemy.orm import Session

load_dotenv()

app = FastAPI(title="Mom's AI Companion API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.getenv("FRONTEND_URL", "http://localhost:5173"),
        "https://*.vercel.app",
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize clients
groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))
twilio_client = Client(
    os.getenv("TWILIO_ACCOUNT_SID"),
    os.getenv("TWILIO_AUTH_TOKEN")
)

# Scheduler for WhatsApp reminders
scheduler = BackgroundScheduler()
scheduler.start()

# Initialize database
init_db()

# ============ Models ============

class ConvertRequest(BaseModel):
    text: str
    target_language: str

class ConvertResponse(BaseModel):
    converted_text: str

class SurpriseRequest(BaseModel):
    style: Optional[str] = "poem"  # poem, quote, compliment

class SurpriseResponse(BaseModel):
    type: str
    text: str

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[ChatMessage]] = []

class ChatResponse(BaseModel):
    reply: str

class NoteRequest(BaseModel):
    note: str
    phone: str
    
    @validator('phone')
    def validate_phone(cls, v):
        # Remove spaces, dashes, parentheses
        cleaned = re.sub(r'[\s\-\(\)]', '', v)
        # Check if it starts with + or is numeric
        if not (cleaned.startswith('+') or cleaned.isdigit()):
            raise ValueError('Phone number must be numeric or start with +')
        if len(cleaned) < 10:
            raise ValueError('Phone number too short')
        return cleaned

class NoteResponse(BaseModel):
    status: str
    note_id: int
    remind_at: str

class StatusResponse(BaseModel):
    note_id: int
    sent: bool
    scheduled_at: str
    sent_at: Optional[str]

# ============ Helper Functions ============

def get_groq_response(messages: List[dict], max_tokens: int = 200) -> str:
    """Get response from Groq API"""
    try:
        chat_completion = groq_client.chat.completions.create(
            messages=messages,
            model="llama-3.1-8b-instant",
            temperature=0.7,
            max_tokens=max_tokens
        )
        return chat_completion.choices[0].message.content.strip()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Groq API error: {str(e)}")

def send_whatsapp_reminder(note_id: int):
    """Send WhatsApp reminder for a specific note"""
    db = SessionLocal()
    try:
        note = db.query(Note).filter(Note.id == note_id).first()
        if not note or note.sent_flag:
            return
        
        # Format phone number for WhatsApp
        phone = note.phone
        if not phone.startswith('whatsapp:'):
            if not phone.startswith('+'):
                phone = '+' + phone
            phone = 'whatsapp:' + phone
        
        # Send message
        message = twilio_client.messages.create(
            from_=os.getenv("TWILIO_WHATSAPP_FROM"),
            body=f"Reminder: {note.text} — From your little app 💛",
            to=phone
        )
        
        # Update note
        note.sent_flag = True
        note.sent_at = datetime.utcnow()
        db.commit()
        
        print(f"✅ Reminder sent for note {note_id}: {message.sid}")
        
    except Exception as e:
        print(f"❌ Failed to send reminder for note {note_id}: {str(e)}")
    finally:
        db.close()

# ============ API Endpoints ============

@app.get("/")
def read_root():
    return {
        "message": "Mom's AI Companion API",
        "version": "1.0.0",
        "endpoints": ["/api/convert", "/api/surprise", "/api/chat", "/api/notes"]
    }

@app.post("/api/convert", response_model=ConvertResponse)
def convert_message(request: ConvertRequest):
    """Translate text to target language"""
    
    prompt = f"""You are a friendly translator. Convert the following text into {request.target_language} naturally and simply. Preserve tone and meaning. Only return the translated text, nothing else.

Input: "{request.text}"
"""
    
    messages = [{"role": "user", "content": prompt}]
    translated = get_groq_response(messages, max_tokens=300)
    
    return ConvertResponse(converted_text=translated)

@app.post("/api/surprise", response_model=SurpriseResponse)
def get_surprise(request: SurpriseRequest):
    """Generate a surprise mini-poem, quote, or compliment"""
    
    style = request.style or "poem"
    
    if style == "poem":
        prompt = "Write a joyful 1–2 line mini-poem for a caring Indian mother. Tone: playful and light. Max 25 words. Only return the poem, nothing else."
    elif style == "quote":
        prompt = "Write an uplifting 1–2 line quote for a caring mother. Tone: warm and encouraging. Max 25 words. Only return the quote, nothing else."
    else:  # compliment
        prompt = "Write a sweet, genuine compliment for a wonderful mother. Make it warm and specific. Max 25 words. Only return the compliment, nothing else."
    
    messages = [{"role": "user", "content": prompt}]
    text = get_groq_response(messages, max_tokens=100)
    
    return SurpriseResponse(type=style, text=text)

@app.post("/api/chat", response_model=ChatResponse)
def chat_with_ai(request: ChatRequest):
    """Chat with AI friend"""
    
    system_prompt = "You are a cheerful AI friend. Reply warmly and briefly (1–3 sentences). Keep tone playful and supportive. Avoid medical or legal advice."
    
    # Build conversation history
    messages = [{"role": "system", "content": system_prompt}]
    
    # Add history (keep last 8 messages)
    if request.history:
        history = request.history[-8:]
        for msg in history:
            messages.append({"role": msg.role, "content": msg.content})
    
    # Add current message
    messages.append({"role": "user", "content": request.message})
    
    reply = get_groq_response(messages, max_tokens=150)
    
    return ChatResponse(reply=reply)

@app.post("/api/notes", response_model=NoteResponse)
def save_note(request: NoteRequest):
    """Save note and schedule WhatsApp reminder"""
    
    db = SessionLocal()
    try:
        # Calculate reminder time (30 minutes from now)
        remind_at = datetime.utcnow() + timedelta(minutes=30)
        
        # Create note
        note = Note(
            text=request.note,
            phone=request.phone,
            remind_at=remind_at,
            sent_flag=False
        )
        db.add(note)
        db.commit()
        db.refresh(note)
        
        # Schedule reminder
        scheduler.add_job(
            send_whatsapp_reminder,
            trigger=DateTrigger(run_date=remind_at),
            args=[note.id],
            id=f"reminder_{note.id}",
            replace_existing=True
        )
        
        return NoteResponse(
            status="scheduled",
            note_id=note.id,
            remind_at=remind_at.isoformat()
        )
        
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()

@app.get("/api/status/{note_id}", response_model=StatusResponse)
def get_note_status(note_id: int):
    """Check status of a note reminder"""
    
    db = SessionLocal()
    try:
        note = db.query(Note).filter(Note.id == note_id).first()
        if not note:
            raise HTTPException(status_code=404, detail="Note not found")
        
        return StatusResponse(
            note_id=note.id,
            sent=note.sent_flag,
            scheduled_at=note.remind_at.isoformat(),
            sent_at=note.sent_at.isoformat() if note.sent_at else None
        )
    finally:
        db.close()

@app.on_event("shutdown")
def shutdown_event():
    """Cleanup on shutdown"""
    scheduler.shutdown()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)