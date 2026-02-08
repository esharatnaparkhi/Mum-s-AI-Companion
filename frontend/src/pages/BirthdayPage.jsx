// src/pages/BirthdayPage.jsx
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const BirthdayPage = () => {
  const [showAnimations, setShowAnimations] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowAnimations(true), 300)
    return () => clearTimeout(t)
  }, [])

  // Sample photos - replace with your own URLs if you want
  const photos = [
    {
      url: '/Img1.jpeg',
      caption: 'Traditional Cutie🥰',
    },
    {
      url: '/Img2.jpeg',
      caption: 'Foodie🍲',
    },
    {
      url: '/Img3.jpeg',
      caption: 'Beach lover🐠',
    },
    {
      url: '/Img4.jpeg',
      caption: 'Happy with gifts💛',
    },
    {
      url: '/Img5.jpeg',
      caption: 'Cutest Smile❤️',
    },
    {
      url: '/Img6.jpeg',
      caption: "Everyone's favourite☺️",
    },
    {
      url: '/Img7.jpeg',
      caption: "Mumma's girl💕",
    },
    {
      url: '/Img8.jpeg',
      caption: "And my everything❤️",
    },
  ]

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      {/* Birthday Banner Section */}
      <div className="bg-gradient-to-r from-[#FFE5D9] via-[#E8DCEF] to-[#D9E8F5] py-12 md:py-16 px-4">
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 transform ${
            showAnimations ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
          }`}
        >
          <div className="flex justify-center gap-3 md:gap-4 mb-6 text-5xl md:text-6xl" aria-hidden>
            <span className="animate-bounce" style={{ animationDelay: '0s' }}>🎂</span>
            <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>🎈</span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🎉</span>
            <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>🎁</span>
          </div>


          <p className="text-xl md:text-3xl text-black-600 italic font-bold">
            Some cute glimpses of you!
          </p>
        </div>
      </div>

      {/* Photo Scroller Section */}
      <div className="py-12 md:py-16 px-4 overflow-hidden">
        <div
          className={`max-w-6xl mx-auto transition-all duration-1000 delay-300 ${
            showAnimations ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}
        >

          {/* Scrolling Photo Strip */}
          <div className="relative">
            <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth px-4 md:px-0">
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 snap-center group"
                  style={{ animation: `fadeInSlide 0.6s ease forwards ${index * 0.08}s`, opacity: 0 }}
                >
                  <div className="relative w-64 h-72 md:w-72 md:h-80 rounded-3xl overflow-hidden shadow-xl border-4 border-white transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                      <p className="text-white text-lg md:text-xl font-semibold text-center">
                        {photo.caption}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </div>

      {/* Decorative Section */}
      <div className="py-4 md:py-4 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border-2 border-[#E8DCEF] text-center">
            <div className="text-5xl md:text-6xl mb-4">❤️</div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Mum, you deserve all the happiness in the world!
            </h3>
            <p className="text-base md:text-lg text-gray-700">
              Thank you for being my strongest backbone, my biggest motivation, and my best friend.
            </p>
            <p className="text-base md:text-lg text-gray-700 italic">
                I love you more than words can express! 🥰 So grateful to have you in my life!
            </p>
          </div>
        </div>
      </div>

      {/* Tools Section Introduction */}
      <div className="py-8 md:py-12 px-4 pb-12">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="bg-gradient-to-r from-[#D4E5D4] to-[#D9F5E5] rounded-3xl p-6 md:p-8 border-2 border-[#B8D4B8]">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              Here's a small digital gift for you!🎁
            </h2>
            <p className="text-base md:text-lg text-gray-700 mb-6">
              I've created some helpful tools just for you! Use them whenever you need.
            </p>
            <Link
              to="/home"
              className="inline-block w-full md:w-auto px-6 md:px-8 py-3 md:py-4 bg-[#D4E5D4] hover:bg-[#C4D9C4] text-[#4A6F4A] font-bold text-lg md:text-xl rounded-2xl transition-all transform hover:scale-105 active:scale-95 border-2 border-[#B8D4B8] shadow-lg"
            >
              Explore Your Tools
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInSlide {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes flash {
          0% { opacity: 0.25; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-2px); }
          100% { opacity: 0.25; transform: translateY(0); }
        }

        .animate-flash {
          animation-name: flash;
          animation-duration: 1s;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }

        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  )
}

export default BirthdayPage

