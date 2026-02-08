// src/pages/Home.jsx
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const features = [
    {
      title: 'Auto-Reminders!',
      emoji: '📝',
      description: 'You will never forget important things with this ai-tool.',
      path: '/notes',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800',
      borderColor: 'border-blue-200',
      size: 'big',
    },
    {
      title: 'Surprise Box!',
      emoji: '🎁',
      description: 'Get your daily surprises.',
      path: '/surprise',
      bgColor: 'bg-rose-50',
      textColor: 'text-rose-800',
      borderColor: 'border-rose-200',
    },
    {
      title: 'AI Buddy!',
      emoji: '😎',
      description: 'Chat about anything.',
      path: '/chat',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-800',
      borderColor: 'border-purple-200',
    },
    {
      title: 'Message Converter!',
      emoji: '💌',
      description: 'Make your messages more fun and cute in different languages.',
      path: '/converter',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-800',
      borderColor: 'border-yellow-200',
      size: 'wide',
    },
  ]

  return (
    <div className="relative min-h-screen flex flex-col justify-center px-5 py-10">
      {/* Back to Birthday Button */}
      <div className="max-w-6xl mx-auto w-full mb-6">
        <Link
          to="/birthday"
          className="text-gray-700 inline-flex items-center gap-2 hover:text-gray-900 transition-colors"
          aria-label="Back to Birthday Page"
        >
          <span className="text-2xl">←</span> Back to Birthday Page
        </Link>
      </div>

      <div className="relative max-w-6xl mx-auto w-full z-10">
        {/* ===== HERO BENTO ===== */}
        <div className="bento mb-10 flex flex-col md:flex-row justify-between items-center gap-6" style={{ animation: 'fadeIn 0.6s ease' }}>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Your own AI Companion 💛</h1>
            <p className="text-gray-600 mt-2 text-lg">Mini tools to help you in your daily tasks.</p>
          </div>

        </div>

        {/* ===== MODERN BENTO GRID ===== */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[170px]">
          {features.map((feature) => (
            <Link
              key={feature.path}
              to={feature.path}
              className={`
                group transition-all duration-300
                ${feature.size === 'big' ? 'md:col-span-2 md:row-span-2' : ''}
                ${feature.size === 'wide' ? 'md:col-span-2' : ''}
              `}
            >
              <div
                className={`
                  ${feature.bgColor}
                  ${feature.borderColor}
                  rounded-3xl p-6 h-full
                  border-2
                  flex flex-col justify-between
                  transform transition-all duration-300
                  hover:scale-[1.02]
                  hover:shadow-lg
                  relative overflow-hidden
                `}
              >
                <div className="relative z-10 text-5xl">{feature.emoji}</div>

                <div className="relative z-10">
                  <h2 className={`text-xl md:text-2xl font-bold ${feature.textColor}`}>{feature.title}</h2>
                  <p className="text-gray-700 mt-1">{feature.description}</p>
                </div>
              </div>
            </Link>
          ))}

          {/* Decorative Tile */}
          <div className="bento flex items-center justify-center text-5xl bg-rose-50 border-2 border-rose-200 rounded-3xl">💛</div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">Made with love by Esha☺️</div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  )
}

export default Home

