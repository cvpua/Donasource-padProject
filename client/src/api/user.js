import api from './index.js'

export const getAllUsers = () => {
	return api.get('v1/user')
}

export const getUserById = (userId) => {
	return api.get(`v1/user/${userId}`, {userId})
}

export const createUser = (username,password,iconURL) => {
	return api.post('v1/user',{username,password,iconURL})
}