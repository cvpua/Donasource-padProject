import React,{ useState, useEffect, useContext } from 'react'
import { Box, Flex, Text } from '@chakra-ui/core'
import SectionHeader from './SectionHeader.js'
import Feed from './Feed.js'
import {BiHomeSmile} from 'react-icons/bi'
import axios from 'axios'
import { PostContext } from './PostProvider.js'


const Home = () => {
	const store = useContext(PostContext)
	const {post} = store
	const [posts, setPosts] = post
	// For better user experience; will set to false once the data fetching is done
	const [isLoading, setIsLoading] = useState(true)

	const createPost = (post) => {
		const newPost = {
			...post,
			likers: [],
			comments: []
		}
		setPosts((prevState) => ([
			...prevState,
			newPost,
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
	      alert(error)
	    }
	  }
	  fetchData()
  }, [setPosts])

	return (
		<Box>
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