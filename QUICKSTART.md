# Quick Start Guide ⚡

Get the app running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- Python 3.11+ installed
- Groq API key ([get one free](https://console.groq.com))
- Twilio account (for WhatsApp - [sign up](https://www.twilio.com/try-twilio))

## 🚀 Super Quick Setup

### 1. Clone/Download the Project

```bash
cd moms-ai-companion
```

### 2. Backend Setup (2 minutes)

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate it
# Mac/Linux:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Setup environment
cp .env.example .env

# Edit .env file with your keys:
# GROQ_API_KEY=your_groq_key_here
# TWILIO_ACCOUNT_SID=your_sid
# TWILIO_AUTH_TOKEN=your_token
# TWILIO_WHATSAPP_FROM=whatsapp:+14155238886

# Run backend
python main.py
```

Backend now running at http://localhost:8000 ✅

### 3. Frontend Setup (2 minutes)

Open a NEW terminal:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Edit .env:
# VITE_API_URL=http://localhost:8000

# Run frontend
npm run dev
```

Frontend now running at http://localhost:5173 ✅

### 4. Test It Out! 🎉

Open your browser to http://localhost:5173

Try each feature:
- 🌐 Message Converter
- 🎁 Surprise Box (instant gratification!)
- 💬 AI Friend (chat away!)
- 📝 Notes (to test WhatsApp, you need to setup Twilio sandbox - see below)

## 📱 Twilio WhatsApp Sandbox Setup (Optional - for testing notes)

1. Go to [Twilio Console](https://console.twilio.com)
2. Navigate to: Messaging → Try it out → Send a WhatsApp message
3. You'll see instructions like: "Send 'join happy-elephant-42' to +1 415 523 8886"
4. Send that message from your WhatsApp
5. Now you can test the Notes & Reminder feature!

**Note:** In sandbox mode, only you (the developer) can receive messages. For production, you need WhatsApp Business API approval.

## 🆘 Common Issues

### Backend won't start

**Error: "Port 8000 already in use"**
```bash
# Kill the process
# Mac/Linux:
lsof -ti:8000 | xargs kill -9
# Windows:
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

**Error: "Module not found"**
```bash
# Make sure virtual environment is activated
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

### Frontend won't start

**Error: "Cannot find module"**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### CORS errors in browser

Make sure:
1. Backend is running on port 8000
2. `.env` in frontend has `VITE_API_URL=http://localhost:8000`
3. Restart frontend after changing .env

## 📋 Environment Variables Explained

### Backend (.env)

```bash
# Get from https://console.groq.com/keys
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxx

# Get from https://console.twilio.com
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxx

# Twilio WhatsApp sandbox number (testing)
# Or your approved number (production)
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886

# Where your frontend runs (for CORS)
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)

```bash
# Where your backend API runs
VITE_API_URL=http://localhost:8000
```

## 🎯 Next Steps

1. **Test all features** locally
2. **Customize** the app (colors, messages, etc.)
3. **Deploy** to production (see DEPLOYMENT.md)
4. **Share** with mom! 💛

## 💡 Tips

- The AI uses Groq's free tier - plenty for testing!
- WhatsApp in sandbox mode only sends to verified numbers
- Notes are stored in `notes.db` (SQLite) - this file is auto-created
- Chat history is session-based (resets when you close the browser)

---

**Have fun building! Made with 💛**