import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const convertMessage = async (text, targetLanguage) => {
  const response = await api.post('/api/convert', {
    text,
    target_language: targetLanguage,
  })
  return response.data
}

export const getSurprise = async (style = 'poem') => {
  const response = await api.post('/api/surprise', { style })
  return response.data
}

export const chatWithAI = async (message, history = []) => {
  const response = await api.post('/api/chat', { message, history })
  return response.data
}

export const saveNote = async (note, phone) => {
  const response = await api.post('/api/notes', { note, phone })
  return response.data
}

export const getNoteStatus = async (noteId) => {
  const response = await api.get(`/api/status/${noteId}`)
  return response.data
}

export default api