import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { saveNote } from '../api'

const Notes = () => {
  const [note, setNote] = useState('')
  const [phone, setPhone] = useState('')
  const [consent, setConsent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)

  // Check if phone is stored in localStorage
  React.useEffect(() => {
    const savedPhone = localStorage.getItem('userPhone')
    if (savedPhone) {
      setPhone(savedPhone)
      setConsent(true)
    }
  }, [])

  const handleSave = async () => {
    if (!note.trim()) {
      alert('Please write a note first')
      return
    }

    if (!phone.trim()) {
      alert('Please enter your phone number')
      return
    }

    if (!consent) {
      alert('Please consent to receive WhatsApp reminders')
      return
    }

    setLoading(true)
    setSuccess(null)

    try {
      const data = await saveNote(note, phone)

      // Save phone to localStorage
      localStorage.setItem('userPhone', phone)

      // Calculate local reminder time
      const remindAt = new Date(data.remind_at)
      const localTime = remindAt.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })

      setSuccess({
        message: `✅ Note saved! You'll get a reminder at ${localTime}`,
        noteId: data.note_id,
      })

      // Clear note
      setNote('')

      // Auto-clear success message after 5 seconds
      setTimeout(() => setSuccess(null), 5000)
    } catch (error) {
      console.error('Error saving note:', error)
      alert('Failed to save note. Please check your phone number and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-4 flex flex-col">
      <Link
        to="/"
        className="text-white mb-6 inline-flex items-center gap-2 hover:opacity-80"
      >
        <span className="text-2xl">←</span> Back
      </Link>

      <div className="max-w-2xl w-full mx-auto flex-1 flex flex-col">
        <div className="bg-white/95 rounded-3xl shadow-2xl p-8 flex-1 flex flex-col">
          <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
            Notes & Reminder 📝
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Save a note and get a WhatsApp reminder in 30 minutes
          </p>

          <div className="space-y-6 flex-1 flex flex-col">
            {/* Note Input */}
            <div className="flex-1 flex flex-col">
              <label className="text-gray-700 font-medium mb-2 text-lg">
                Your Note
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Write a quick note... (e.g., 'Call doctor', 'Buy groceries', 'Take medicine')"
                className="flex-1 p-4 border-2 border-gray-200 rounded-2xl text-lg resize-none focus:outline-none focus:border-purple-400 transition-colors min-h-[150px]"
              />
            </div>

            {/* Phone Input */}
            <div>
              <label className="text-gray-700 font-medium mb-2 text-lg flex items-center gap-2">
                WhatsApp Number
                <span className="text-sm text-gray-500 font-normal">
                  (with country code)
                </span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 9876543210"
                className="w-full p-4 border-2 border-gray-200 rounded-2xl text-lg focus:outline-none focus:border-purple-400 transition-colors"
              />
              <p className="text-sm text-gray-500 mt-2">
                Example: +91 for India, +1 for US, +44 for UK
              </p>
            </div>

            {/* Consent Checkbox */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 w-5 h-5 text-purple-500 rounded focus:ring-purple-400"
              />
              <span className="text-gray-700">
                I consent to receive one WhatsApp reminder per note saved
              </span>
            </label>

            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={!note.trim() || !phone.trim() || !consent || loading}
              className="w-full py-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-bold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transition-all active:scale-95"
            >
              {loading ? 'Saving...' : 'Save & Remind me in 30 min ⏰'}
            </button>

            {/* Success Message */}
            {success && (
              <div className="p-4 bg-green-50 border-2 border-green-200 rounded-2xl">
                <p className="text-green-800 font-medium text-center">
                  {success.message}
                </p>
                <p className="text-green-600 text-sm text-center mt-1">
                  Note ID: {success.noteId}
                </p>
              </div>
            )}

            {/* Info Box */}
            <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-2xl">
              <p className="text-blue-800 text-sm">
                <strong>💡 How it works:</strong> Your note will be saved, and
                you'll receive a WhatsApp message in exactly 30 minutes with your
                reminder. Make sure WhatsApp is installed and your number is
                correct!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notes