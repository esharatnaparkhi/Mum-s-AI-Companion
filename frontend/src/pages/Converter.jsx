import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { convertMessage } from '../api'

const Converter = () => {
  const [text, setText] = useState('')
  const [language, setLanguage] = useState('Hindi')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)

  const languages = [
    'Hindi',
    'English',
    'Marathi',
    'Tamil',
    'Telugu',
    'Bengali',
    'Gujarati',
    'Kannada',
    'Malayalam',
    'Punjabi',
    'Urdu',
    'Spanish',
    'French',
    'German',
    'Chinese',
    'Japanese',
    'Korean',
    'Arabic',
  ]

  // Check for Web Speech API support
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  const recognition = SpeechRecognition ? new SpeechRecognition() : null

  useEffect(() => {
    if (recognition) {
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'en-US'

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setText(transcript)
        setIsListening(false)
      }

      recognition.onerror = () => {
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }
    }
  }, [])

  const startListening = () => {
    if (recognition) {
      setIsListening(true)
      recognition.start()
    } else {
      alert('Speech recognition is not supported in your browser')
    }
  }

  const handleConvert = async () => {
    if (!text.trim()) return

    setLoading(true)
    setResult('')

    try {
      const data = await convertMessage(text, language)
      setResult(data.converted_text)
    } catch (error) {
      console.error('Error converting:', error)
      alert('Failed to convert message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSpeak = () => {
    if ('speechSynthesis' in window && result) {
      const utterance = new SpeechSynthesisUtterance(result)
      utterance.lang = language === 'Hindi' ? 'hi-IN' : 'en-US'
      window.speechSynthesis.speak(utterance)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(result)
    alert('Copied to clipboard!')
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          text: result,
        })
      } catch (error) {
        console.log('Share cancelled')
      }
    } else {
      handleCopy()
    }
  }

  return (
    <div className="min-h-screen p-4 flex flex-col">
      <Link
        to="/home"
        className="text-gray-700 mb-6 inline-flex items-center gap-2 hover:text-gray-900 transition-colors"
      >
        <span className="text-2xl">←</span> Back
      </Link>

      <div className="max-w-2xl w-full mx-auto flex-1 flex flex-col">
        <div className="bento flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-sage border-2 border-sage rounded-2xl p-6 mb-6">
            <h1 className="text-3xl font-bold text-center text-sage-dark">
              Message Converter 🌍
            </h1>
            <p className="text-center text-gray-700 mt-2">
              Speak or type to translate
            </p>
          </div>

          {/* Input Section */}
          <div className="space-y-4 flex-1 flex flex-col">
            <div className="flex gap-3">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type your message or tap the mic..."
                className="flex-1 p-4 border-2 border-gray-200 rounded-2xl text-lg resize-none focus:outline-none focus:border-sage transition-colors bg-white"
                rows="4"
              />
              {recognition && (
                <button
                  onClick={startListening}
                  disabled={isListening}
                  className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl transition-all shadow-md border-2 ${
                    isListening
                      ? 'bg-rose border-rose animate-pulse'
                      : 'bg-sage border-sage hover:scale-105 active:scale-95'
                  }`}
                >
                  {isListening ? '⏸️' : '🎤'}
                </button>
              )}
            </div>

            {/* Language Selection */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-2xl text-lg font-medium focus:outline-none focus:border-sage transition-colors bg-white"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>

            {/* Convert Button */}
            <button
              onClick={handleConvert}
              disabled={!text.trim() || loading}
              className="w-full py-5 bg-sage text-sage-dark border-2 border-sage text-xl font-bold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#C4D9C4] transition-all active:scale-95"
            >
              {loading ? 'Converting...' : 'Convert 🚀'}
            </button>

            {/* Result Section */}
            {result && (
              <div className="mt-6 p-6 bg-mint border-2 border-[#C4E5D4] rounded-2xl">
                <p className="text-xl text-gray-800 mb-4 leading-relaxed">
                  {result}
                </p>

                <div className="flex gap-3 flex-wrap">
                  <button
                    onClick={handleCopy}
                    className="px-6 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-colors font-medium text-gray-700 flex items-center gap-2"
                  >
                    📋 Copy
                  </button>
                  <button
                    onClick={handleSpeak}
                    className="px-6 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-colors font-medium text-gray-700 flex items-center gap-2"
                  >
                    🔊 Play
                  </button>
                  <button
                    onClick={handleShare}
                    className="px-6 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-colors font-medium text-gray-700 flex items-center gap-2"
                  >
                    📤 Share
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Converter