import React,{ useState, useEffect, useContext } from 'react'
import { Box } from '@chakra-ui/core'
import SectionHeader from './SectionHeader.js'
import Feed from './Feed.js'
import {BiHomeSmile} from 'react-icons/bi'
import axios from 'axios'
import { PostContext } from './PostProvider.js'
import Toast from './Toast'

const Home = () => {
	const store = useContext(PostContext)
	const {post} = store
	const [posts, setPosts] = post
	// For better user experience; will set to false once the data fetching is done
	const [isLoading, setIsLoading] = useState(true)
	const [message, setMessage] = useState()

	const createPost = (post) => {
		setPosts((prevState) => ([
			post,
			...prevState,
		]))
	}

	// For fetching the list of posts
	// This will trigger the effect every time Home is rendered
	// Effect: fetching the posts and saving it to the posts state
	useEffect(() => {
	  const fetchData = async () => {
	    try{
	      const { data } = await axios.get('/api/posts')
	      setPosts(data.response)
				setIsLoading(false)
	    }catch(error){
	      setMessage({
	        title: "Error",
	        description: error.response.data.message,
	        status: "error",
	        duration: 2000,
	        isClosable: true,
	      })
	    }
	  }
	  fetchData()
  }, [setPosts])

	return (
		<Box>
			<Toast message={message} />
			{/* Section Header */}
      <SectionHeader title="Home" icon={BiHomeSmile}/>
      {
      		<Feed 
		      	posts={posts}
		      	createPost={createPost}
		      	isLoading={isLoading}
		      />
      }
    	
    </Box>
	)
}

export default Home