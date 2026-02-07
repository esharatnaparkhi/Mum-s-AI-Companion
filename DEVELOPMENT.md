# Development Guide 👩‍💻

## Project Structure

```
moms-ai-companion/
├── backend/
│   ├── main.py          # FastAPI app with all endpoints
│   ├── database.py      # SQLAlchemy models
│   └── requirements.txt # Python dependencies
│
└── frontend/
    ├── src/
    │   ├── pages/       # Home, Converter, Surprise, Chat, Notes
    │   ├── api.js       # API client
    │   └── App.jsx      # Router
    └── package.json     # Node dependencies
```

## Backend Architecture

### Endpoints
- `POST /api/convert` - Translate text using Groq
- `POST /api/surprise` - Generate poem/quote/compliment
- `POST /api/chat` - Chat with AI (conversation context)
- `POST /api/notes` - Save note + schedule WhatsApp reminder
- `GET /api/status/:note_id` - Check reminder status

### Database Model
```python
Note:
  - id (int)
  - text (str)
  - phone (str)
  - created_at (datetime)
  - remind_at (datetime)
  - sent_flag (bool)
  - sent_at (datetime, nullable)
```

## Frontend Architecture

### Routes
- `/` - Home (4 feature cards)
- `/converter` - Translation
- `/surprise` - Surprise box
- `/chat` - AI chat
- `/notes` - Notes + reminders

### State Management
- Local state with `useState`
- Session storage for chat history
- LocalStorage for phone number

## Adding New Features

### Backend: New Endpoint

```python
@app.post("/api/new-feature")
def new_feature(request: NewRequest):
    # Your logic
    return {"result": "success"}
```

### Frontend: New Page

1. Create `src/pages/NewFeature.jsx`
2. Add route in `App.jsx`
3. Add card in `Home.jsx`
4. Add API function in `api.js`

## Testing

### Manual Testing
```bash
# Test translation
curl -X POST http://localhost:8000/api/convert \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello", "target_language": "Hindi"}'
```

## Customization

### Change AI Model
In `backend/main.py`:
```python
model="llama-3.1-8b-instant"
# Try: llama-3.1-70b-versatile
```

### Change Colors
In `frontend/tailwind.config.js`:
```javascript
pastel: {
  pink: '#YOUR_COLOR',
  // etc.
}
```

### Change Reminder Time
In `backend/main.py`:
```python
remind_at = datetime.utcnow() + timedelta(minutes=30)
# Change to: timedelta(hours=1)
```

---

**Happy coding! 🚀**