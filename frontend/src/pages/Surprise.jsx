import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getSurprise } from '../api'
import confetti from 'canvas-confetti'

const Surprise = () => {
  const [surprise, setSurprise] = useState(null)
  const [loading, setLoading] = useState(false)
  const [style, setStyle] = useState('poem')

  const styles = [
    { value: 'poem', label: 'Poem 📜', emoji: '📜' },
    { value: 'quote', label: 'Quote 💫', emoji: '💫' },
    { value: 'compliment', label: 'Compliment 💝', emoji: '💝' },
  ]

  const handleGetSurprise = async () => {
    setLoading(true)
    setSurprise(null)

    try {
      const data = await getSurprise(style)
      setSurprise(data)

      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD6E8', '#C3E5FF', '#E5D4FF', '#FFF6D4', '#D4FFE5'],
      })
    } catch (error) {
      console.error('Error getting surprise:', error)
      alert('Failed to get surprise. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleShare = async () => {
    if (navigator.share && surprise) {
      try {
        await navigator.share({
          text: surprise.text,
        })
      } catch (error) {
        console.log('Share cancelled')
      }
    } else if (surprise) {
      navigator.clipboard.writeText(surprise.text)
      alert('Copied to clipboard!')
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
        <div className="bg-white/95 rounded-3xl shadow-2xl p-8 flex-1 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
            Surprise Box 🎁
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Tap for a delightful surprise!
          </p>

          {/* Style Selection */}
          <div className="flex gap-3 mb-8 flex-wrap justify-center">
            {styles.map((s) => (
              <button
                key={s.value}
                onClick={() => setStyle(s.value)}
                className={`px-6 py-3 rounded-2xl font-medium transition-all ${
                  style === s.value
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Surprise Button */}
          <button
            onClick={handleGetSurprise}
            disabled={loading}
            className="w-64 h-64 rounded-full bg-gradient-to-br from-yellow-300 via-pink-300 to-purple-400 shadow-2xl text-6xl flex items-center justify-center transform transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mb-8 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
            <span className="relative z-10">{loading ? '⏳' : '🎁'}</span>
          </button>

          {/* Result */}
          {surprise && (
            <div className="w-full max-w-md space-y-4 animate-fadeIn">
              <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200">
                <p className="text-xl text-center text-gray-800 leading-relaxed italic">
                  "{surprise.text}"
                </p>
              </div>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleGetSurprise}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg transition-all"
                >
                  Get Another! 🔄
                </button>
                <button
                  onClick={handleShare}
                  className="px-6 py-3 bg-white rounded-xl shadow hover:shadow-lg transition-shadow font-medium text-gray-700"
                >
                  Share 📤
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Surprise