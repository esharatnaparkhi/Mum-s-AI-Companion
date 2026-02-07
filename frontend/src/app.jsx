import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Converter from './pages/Converter'
import Surprise from './pages/Surprise'
import Chat from './pages/Chat'
import Notes from './pages/Notes'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-pastel-blue via-pastel-purple to-pastel-pink">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/converter" element={<Converter />} />
          <Route path="/surprise" element={<Surprise />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/notes" element={<Notes />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App