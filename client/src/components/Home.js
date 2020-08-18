import React,{ useState, useEffect } from 'react'
import { Box, Spinner } from '@chakra-ui/core'
import SectionHeader from './SectionHeader.js'
import Feed from './Feed.js'
import {FaHome} from 'react-icons/fa'
import axios from 'axios'

const Home = () => {
	const [posts, setPosts] = useState([])
	// For better user experience; will set to false once the data fetching is done
	const [isLoading, setIsLoading] = useState(true)

	const createPost = (newPost) => {
		setPosts((prevState) => ([
			...prevState,
			newPost,
		]))
		console.log('Posts: ', posts)
	}

	// For fetching the list of posts
	// This will trigger the effect every time Home is rendered
	// Effect: fetching the posts and saving it to the posts state
	useEffect(() => {
	  const fetchData = async () => {
	    try{
	      const { data } = await axios.get('/api/posts')
	      console.log('Data: ', data)
	      setPosts(data.response)
				setIsLoading(!isLoading)
	    }catch(error){
	      alert(error)
	    }
	  }
	  fetchData()
  }, [])

	return (
		<Box>
			{/* Section Header */}
      <SectionHeader title="Home" icon={FaHome}/>
    	<Feed 
      	posts={posts}
      	createPost={createPost}
      	isLoading={isLoading}
      />  
    </Box>
	)
}

export default Home