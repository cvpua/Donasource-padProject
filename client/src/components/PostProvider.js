import React,{ useState } from 'react'

export const PostContext = React.createContext(null)

const INIT_POSTS = [
	{
		_id: '1',
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

	return (
		<PostContext.Provider value={[posts, setPosts]} >
			{children}
		</PostContext.Provider>
	)
}

export default PostProvider