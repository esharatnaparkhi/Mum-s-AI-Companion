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
    { value: 'compliment', label: 'Compliment 💐', emoji: '💐' },
  ]

  const handleGetSurprise = async () => {
    setLoading(true)
    setSurprise(null)

    try {
      const data = await getSurprise(style)
      setSurprise(data)

      // Trigger confetti with poster colors
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4E5D4', '#FFE5D9', '#E8DCEF', '#FFF4D9', '#D9F5E5'],
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
        to="/home"
        className="text-gray-700 mb-6 inline-flex items-center gap-2 hover:text-gray-900 transition-colors"
      >
        <span className="text-2xl">←</span> Back
      </Link>

      <div className="max-w-2xl w-full mx-auto flex-1 flex flex-col">
        <div className="bento flex-1 flex flex-col items-center justify-center">
          {/* Header */}
          <div className="bg-peach border-2 border-peach rounded-2xl p-6 mb-8 w-full">
            <h1 className="text-3xl font-bold text-center text-peach-dark">
              Surprise Box 🎁
            </h1>
            <p className="text-center text-gray-700 mt-2">
              Tap for a delightful surprise!
            </p>
          </div>

          {/* Style Selection */}
          <div className="flex gap-3 mb-8 flex-wrap justify-center">
            {styles.map((s) => (
              <button
                key={s.value}
                onClick={() => setStyle(s.value)}
                className={`px-6 py-3 rounded-2xl font-medium transition-all border-2 ${
                  style === s.value
                    ? 'bg-peach border-peach text-peach-dark scale-105'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-peach'
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
            className="w-64 h-64 rounded-full bg-butter border-4 border-[#FFE8BD] text-6xl flex items-center justify-center transform transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mb-8 relative overflow-hidden shadow-lg"
          >
            <span className="relative z-10">{loading ? '⏳' : '🎁'}</span>
          </button>

          {/* Result */}
          {surprise && (
            <div className="w-full max-w-md space-y-4 animate-fadeIn">
              <div className="p-6 bg-lavender border-2 border-lavender rounded-2xl">
                <p className="text-xl text-center text-gray-800 leading-relaxed italic">
                  "{surprise.text}"
                </p>
              </div>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleGetSurprise}
                  className="px-6 py-3 bg-peach border-2 border-peach text-peach-dark rounded-xl font-medium hover:bg-[#FFD9CC] transition-all"
                >
                  Get Another! 🔄
                </button>
                <button
                  onClick={handleShare}
                  className="px-6 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-colors font-medium text-gray-700"
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