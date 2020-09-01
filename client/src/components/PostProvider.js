import React,{ useState } from 'react'

export const PostContext = React.createContext(null)

const INIT_POSTS = [
	{
		_id: '1',
		user : {	
			name: {
				firstName: '',
				lastName: '',
			},
			avatar : null,
			username : '',
			userId : 1
		},
		avatar: null,
		title: '',
		name: {
			firstName: '',
			lastName: '',
		},
		deadline: null,
		description: '',
		items: [],
		tags: [],
	  likers: [],
	  status: '',
	  images: [],
	},
	{
		_id: '2',
		user : {	
			name: {
				firstName: '',
				lastName: '',
			},
			avatar : null,
			username : '',
			userId : 2
		},
		avatar: null,
		title: '',
		name: {
			firstName: '',
			lastName: '',
		},
		deadline: null,
		description: '',
		items: [],
		tags: [],
	  likers: [],
	  status: '',
	  images: [],
	},
	{
		_id: '3',
		user : {	
			name: {
				firstName: '',
				lastName: '',
			},
			avatar : null,
			username : '',
			userId : 3
		},
		avatar: null,
		title: '',
		name: {
			firstName: '',
			lastName: '',
		},
		deadline: null,
		description: '',
		items: [],
		tags: [],
	  likers: [],
	  status: '',
	  images: [],
	},
]

const PostProvider = ({children}) => {
	const [posts, setPosts] = useState(INIT_POSTS)
	const [filteredPosts, setFilteredPosts] = useState([])

	const store = {
		post: [posts, setPosts],
		filteredPost: [filteredPosts, setFilteredPosts],
	}

	return (
		<PostContext.Provider value={store} >
			{children}
		</PostContext.Provider>
	)
}

export default PostProvider