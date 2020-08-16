import React,{userReducer} from 'react'

const addPost = (state,newPost) => {
	return [...state,newPost]
}

const addComment = (state,{}) => {
	return []
}

const reducer = (state, action) => {
	switch(action.type) {
		case 'ADD_POST':
			return addPost(state,action.payload)
		case 'ADD_COMMENT':
			return comment(state,action.payload)
		default:
			return state
	}
}

const [posts, dispatch] = useReducer(reducer, [])