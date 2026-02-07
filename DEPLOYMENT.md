# Deployment Guide 🚀

## Deploy to Railway (Backend) + Vercel (Frontend)

### Step 1: Deploy Backend to Railway

1. **Create Railway Account** at [railway.app](https://railway.app)

2. **Create New Project** → "Deploy from GitHub repo" or "Empty Project"

3. **Add Environment Variables:**
   ```
   GROQ_API_KEY=your_groq_api_key
   TWILIO_ACCOUNT_SID=your_twilio_sid
   TWILIO_AUTH_TOKEN=your_twilio_token
   TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
   FRONTEND_URL=https://your-app.vercel.app
   ```

4. **Deploy** - Railway auto-detects Python and uses Procfile

5. **Note your backend URL** (e.g., `https://your-app.up.railway.app`)

### Step 2: Deploy Frontend to Vercel

1. **Create Vercel Account** at [vercel.com](https://vercel.com)

2. **Import Project** → Select GitHub repository → Choose `frontend` folder

3. **Configure Build:**
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Add Environment Variable:**
   ```
   VITE_API_URL=https://your-backend.up.railway.app
   ```

5. **Deploy** - Vercel will build and deploy

6. **Update Railway:** Go back to Railway and update `FRONTEND_URL` to your Vercel URL

## Twilio WhatsApp Setup

### Sandbox (Testing)
1. Go to Twilio Console → Messaging → Try WhatsApp
2. Send `join <code>` to Twilio number from your WhatsApp
3. Test with sandbox number

### Production
1. Request WhatsApp Business API access from Twilio
2. Wait for approval (1-2 weeks)
3. Update `TWILIO_WHATSAPP_FROM` with your approved number

## Post-Deployment Checklist

- [ ] Backend accessible at Railway URL
- [ ] Frontend accessible at Vercel URL
- [ ] Test Message Converter
- [ ] Test Surprise Box
- [ ] Test AI Chat
- [ ] Test Notes & WhatsApp reminder (wait 30 min)
- [ ] Share URL with mom! 💛

## Cost Estimates

- **Railway:** Free tier (500 hours/month)
- **Vercel:** Free tier (100GB bandwidth)
- **Groq:** Free tier
- **Twilio:** ~$0.005 per WhatsApp message

**Monthly cost: $0-5** for light usage

---

**You're deployed! 🎉**