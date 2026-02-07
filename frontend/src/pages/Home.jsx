import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const features = [
    {
      title: 'Message Converter',
      emoji: '🌐',
      description: 'Translate voice or text to any language',
      path: '/converter',
      gradient: 'card-gradient-blue',
    },
    {
      title: 'Surprise Box',
      emoji: '🎁',
      description: 'Get a joyful poem or quote',
      path: '/surprise',
      gradient: 'card-gradient-pink',
    },
    {
      title: 'AI Friend',
      emoji: '💬',
      description: 'Chat with your cheerful companion',
      path: '/chat',
      gradient: 'card-gradient',
    },
    {
      title: 'Notes & Reminder',
      emoji: '📝',
      description: 'Save notes with WhatsApp reminders',
      path: '/notes',
      gradient: 'card-gradient-yellow',
    },
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white drop-shadow-lg">
          Mom's AI Companion 💛
        </h1>
        <p className="text-center text-white text-lg mb-12 drop-shadow">
          Four delightful ways to brighten your day
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <Link
              key={feature.path}
              to={feature.path}
              className="transform transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <div
                className={`${feature.gradient} rounded-3xl p-8 shadow-2xl h-full flex flex-col items-center text-center text-white`}
              >
                <div className="text-6xl mb-4">{feature.emoji}</div>
                <h2 className="text-2xl font-bold mb-2">{feature.title}</h2>
                <p className="text-white/90">{feature.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12 text-white/80 text-sm">
          Made with love by Esha 💝
        </div>
      </div>
    </div>
  )
}

export default Home