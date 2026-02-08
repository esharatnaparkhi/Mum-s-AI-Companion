// src/App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BirthdayWish from './pages/BirthdayWish'
import BirthdayPage from './pages/BirthdayPage'
import Home from './pages/Home'
import Converter from './pages/Converter'
import Surprise from './pages/Surprise'
import Chat from './pages/Chat'
import Notes from './pages/Notes'

function App() {
  return (
    <Router>
      {/* MAIN APP BACKGROUND – Modern Clean Theme */}
      <div className="min-h-screen bg-[#F5F5F0]">
        <Routes>
          {/* Birthday Flow - Landing Pages */}
          <Route path="/" element={<BirthdayWish />} />
          <Route path="/birthday" element={<BirthdayPage />} />

          {/* Main Tools Section */}
          <Route path="/home" element={<Home />} />
          <Route path="/converter" element={<Converter />} />
          <Route path="/surprise" element={<Surprise />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/notes" element={<Notes />} />

          {/* Fallback - redirect to landing */}
          <Route path="*" element={<BirthdayWish />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
