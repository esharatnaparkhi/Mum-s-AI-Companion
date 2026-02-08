import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { chatWithAI } from '../api'

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! 👋 I\'m your cheerful AI friend. How can I brighten your day?',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const quickReplies = [
    'Tell me a joke 😄',
    'What should I cook? 🍳',
    'Give me motivation 💪',
    'Tell me something nice 🌸',
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (message = input) => {
    if (!message.trim() || loading) return

    const userMessage = message.trim()
    setInput('')

    // Add user message
    const newMessages = [...messages, { role: 'user', content: userMessage }]
    setMessages(newMessages)
    setLoading(true)

    try {
      // Prepare history (exclude the welcome message, keep last 8)
      const history = newMessages
        .slice(1, -1)
        .slice(-8)
        .map((msg) => ({
          role: msg.role,
          content: msg.content,
        }))

      const data = await chatWithAI(userMessage, history)

      // Add AI response
      setMessages([...newMessages, { role: 'assistant', content: data.reply }])
    } catch (error) {
      console.error('Error chatting:', error)
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: 'Oops! Something went wrong. Please try again.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="min-h-screen p-4 flex flex-col">
      <Link
        to="/"
        className="text-gray-700 mb-4 inline-flex items-center gap-2 hover:text-gray-900 transition-colors"
      >
        <span className="text-2xl">←</span> Back
      </Link>

      <div className="max-w-3xl w-full mx-auto flex-1 flex flex-col bento overflow-hidden">
        {/* Header */}
        <div className="bg-lavender border-2 border-lavender p-6 rounded-2xl mb-4">
          <h1 className="text-2xl font-bold text-center text-lavender-dark">AI Friend 💬</h1>
          <p className="text-center text-gray-700 text-sm mt-1">
            Your cheerful companion
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FAFAF8] rounded-2xl">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-2xl ${
                  msg.role === 'user'
                    ? 'bg-lavender border-2 border-lavender text-gray-800 rounded-br-sm'
                    : 'bg-white border-2 border-gray-200 text-gray-800 rounded-bl-sm'
                }`}
              >
                <p className="leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border-2 border-gray-200 p-4 rounded-2xl rounded-bl-sm">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0.1s' }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        {messages.length <= 2 && (
          <div className="p-4 bg-[#FAFAF8] border-2 border-gray-200 rounded-2xl mt-4">
            <p className="text-sm text-gray-600 mb-2">Quick suggestions:</p>
            <div className="flex gap-2 flex-wrap">
              {quickReplies.map((reply, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(reply)}
                  disabled={loading}
                  className="px-4 py-2 bg-lavender border-2 border-lavender text-lavender-dark rounded-full text-sm hover:bg-[#DDD0E8] transition-colors disabled:opacity-50"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 bg-white border-2 border-gray-200 rounded-2xl mt-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={loading}
              className="flex-1 p-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-lavender transition-colors disabled:bg-gray-100"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || loading}
              className="px-8 py-4 bg-lavender border-2 border-lavender text-lavender-dark rounded-2xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#DDD0E8] transition-all active:scale-95"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat