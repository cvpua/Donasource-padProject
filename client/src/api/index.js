import axios from 'axios'

const api = axios.create({
	baseURL: '',
  withCredentials: true,
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json'
  }
})

export default api

export * from './post.js'
export * from './user.js'