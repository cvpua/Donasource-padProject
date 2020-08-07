import api from './index.js'

export const getSession = () => (
	api.get('/v1/session')
)  

export const login = (username, password) => (
	api.post('/v1/login', { username, password })
)

export const logout = () => (
	api.post('/v1/logout')
)  