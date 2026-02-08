// src/pages/BirthdayWish.jsx
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const BirthdayWish = () => {
  const [show, setShow] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 120)
    return () => clearTimeout(t)
  }, [])

  const handleContinue = () => {
    navigate('/birthday')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-[#FFE5D9] via-[#FFF4D9] to-[#E8DCEF]">
      {/* Floating Elements - Hidden on mobile for better readability */}
      <div className="hidden md:block absolute top-10 left-10 text-6xl animate-bounce" style={{ animationDelay: '0s' }} aria-hidden>🎈</div>
      <div className="hidden md:block absolute top-20 right-20 text-6xl animate-bounce" style={{ animationDelay: '0.5s' }} aria-hidden>🎉</div>
      <div className="hidden md:block absolute bottom-20 left-20 text-6xl animate-bounce" style={{ animationDelay: '1s' }} aria-hidden>🎂</div>
      <div className="hidden md:block absolute bottom-10 right-10 text-6xl animate-bounce" style={{ animationDelay: '1.5s' }} aria-hidden>🎁</div>
      <div className="hidden md:block absolute top-1/2 left-10 text-5xl animate-bounce" style={{ animationDelay: '0.7s' }} aria-hidden>✨</div>
      <div className="hidden md:block absolute top-1/3 right-10 text-5xl animate-bounce" style={{ animationDelay: '1.2s' }} aria-hidden>💐</div>

      {/* Main Card */}
      <div
        className={`max-w-lg w-full transition-all duration-1000 transform ${
          show ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
        }`}
      >
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-12 text-center border-4 border-[#FFE5D9]">
          {/* Confetti Icon */}
          <div className="text-7xl md:text-8xl mb-6 animate-pulse" aria-hidden>🎊</div>

          {/* Birthday Message */}
          {/* <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2">Happy Birthday</h1> */}
          <h2 className="text-2xl md:text-4xl font-bold 
        bg-gradient-to-r from-[#D4755F] via-gray-900 to-[#D47A8F]  bg-clip-text text-transparent mb-6">
        Happy Birthday Aai 💛
        </h2>

          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-1">
            You are truly the <b>prettiest</b>, most <b>graceful</b>, and <b>strongest</b> person I have ever known.
            Your beauty is not just on the outside, it shines through <b>your heart</b> and in the gentle way you speak and live.
            I just want you to <b>stay happy always</b>, and remember that you never stand alone.
          </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6"><b>You have my back, always!</b></p>

          {/* Decorative Hearts
          <div className="flex justify-center gap-3 mb-8 text-3xl md:text-4xl" aria-hidden>
            <span className="animate-pulse">💕</span>
            <span className="animate-pulse" style={{ animationDelay: '0.3s' }}>💖</span>
            <span className="animate-pulse" style={{ animationDelay: '0.6s' }}>💕</span>
          </div> */}

          {/* Continue Button */}
          <button
  onClick={handleContinue}
  className="w-full md:w-auto px-4 md:px-4 py-2 md:py-2 my-6 
  bg-white hover:bg-gray-50 text-[#D4755F]
  font-bold text-lg md:text-xl rounded-xl transition-all 
  transform hover:scale-105 active:scale-95 
  border-2 border-gray-900/40 shadow-lg"
  aria-label="Continue to Birthday Page"
>
  Continue to Your Special Day 🎉
</button>


          {/* Decorative Hearts */}
          <div className="flex justify-center gap-3 mb-1 text-3xl md:text-4xl" aria-hidden>
            <span className="animate-pulse">💕</span>
            <span className="animate-pulse" style={{ animationDelay: '0.3s' }}>💖</span>
            <span className="animate-pulse" style={{ animationDelay: '0.6s' }}>💕</span>
          </div>

        </div>
      </div>
    </div>
  )
}

export default BirthdayWish
