import React,{ useState } from 'react'

export const PostContext = React.createContext(null)

const PostProvider = ({children}) => {
	const [posts, setPosts] = useState([])

	return (
		<PostContext.Provider value={[posts, setPosts]} >
			{children}
		</PostContext.Provider>
	)
}

export default PostProvider