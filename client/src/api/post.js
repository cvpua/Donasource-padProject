import api from './index.js'

export const createPost = (title,author,content) => (
	api.post(`v1/post`, {title,author,content})
)

export const getAllPost = () => {
	api.get(`v1/post`)
}

export const getPostById = (postId) => {
	api.get(`v1/post/${postId}`, postId)
}
