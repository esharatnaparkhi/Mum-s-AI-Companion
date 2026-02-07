# Mom's Little AI Companion 💛

A delightful 4-in-1 web application designed to bring joy and utility to your mom's daily life. Simple, beautiful, and powered by AI.

## 🌟 Features

1. **Message Converter 🌐** - Translate voice or text to any language with speech recognition and text-to-speech
2. **Surprise Box 🎁** - Get joyful mini-poems, quotes, or compliments with confetti animations
3. **AI Friend 💬** - Chat with a cheerful AI companion for support and conversation
4. **Notes & Reminder 📝** - Save notes and receive WhatsApp reminders in 30 minutes

## 🚀 Tech Stack

### Frontend
- **React 18** - UI framework
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **React Router** - Navigation
- **Axios** - HTTP client
- **Canvas Confetti** - Celebration animations
- **Web Speech API** - Voice recognition and text-to-speech

### Backend
- **FastAPI** - Python web framework
- **Groq** - LLM for AI responses (llama-3.1-8b-instant)
- **Twilio** - WhatsApp messaging
- **APScheduler** - Background job scheduling
- **SQLAlchemy** - Database ORM
- **SQLite/PostgreSQL** - Database

## 📋 Prerequisites

- **Node.js** 18+ (for frontend)
- **Python** 3.11+ (for backend)
- **Groq API Key** - Get from [groq.com](https://groq.com)
- **Twilio Account** - Get from [twilio.com](https://twilio.com)
  - Account SID
  - Auth Token
  - WhatsApp-enabled phone number

## 🛠️ Installation & Setup

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your credentials:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
   FRONTEND_URL=http://localhost:5173
   ```

5. **Run the backend:**
   ```bash
   python main.py
   ```
   
   Backend will run on `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env`:
   ```env
   VITE_API_URL=http://localhost:8000
   ```

4. **Run the frontend:**
   ```bash
   npm run dev
   ```
   
   Frontend will run on `http://localhost:5173`

## 📱 Usage Guide

### For Mom:

1. **Message Converter**
   - Tap the mic button and speak, or type your message
   - Select the target language
   - Press "Convert" to get the translation
   - Use Play, Copy, or Share buttons

2. **Surprise Box**
   - Choose type: Poem, Quote, or Compliment
   - Tap the big surprise button
   - Enjoy the confetti! 🎉
   - Get another or share it

3. **AI Friend**
   - Type your message or use quick suggestions
   - Chat naturally with your AI companion
   - Get warm, friendly responses

4. **Notes & Reminder**
   - Write your note
   - Enter your WhatsApp number (with country code)
   - Check the consent box
   - Save and receive a reminder in 30 minutes!

## 🔧 API Endpoints

- `POST /api/convert` - Translate text
- `POST /api/surprise` - Get surprise content
- `POST /api/chat` - Chat with AI
- `POST /api/notes` - Save note with reminder
- `GET /api/status/:note_id` - Check reminder status

## 🔐 Privacy & Security

- Phone numbers stored securely
- Environment variables for API keys
- Rate limiting on WhatsApp messages
- Consent checkbox for WhatsApp reminders
- No long-term memory (privacy-first)

## 🐛 Troubleshooting

### Backend Issues

- **Port 8000 already in use:**
  ```bash
  # Find and kill the process
  lsof -ti:8000 | xargs kill -9
  ```

### WhatsApp Not Working

- **Sandbox mode:** Use Twilio WhatsApp sandbox for testing
  - Send "join <your-code>" to the Twilio number first
- **Production:** Request WhatsApp API access from Twilio
- **Number format:** Always include country code (e.g., +91...)

## 💝 Credits

Made with love by Esha for Mom 💛

---

**Happy chatting, translating, and surprising! 🎉**