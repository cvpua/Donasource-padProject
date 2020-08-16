import React,{ useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import { Stack, Box, Flex, Avatar, Text } from '@chakra-ui/core'
import Post from './Post.js'
import MarcoPic from '../assets/dp.jpg'
import SectionHeader from './SectionHeader.js'

const initialValues = {
		avatar: MarcoPic,
		author: 'Marco Mirandilla',
		title: 'Penge Ayuda',
		description: 'Wala lang',
		type: 'donation',
		location: 'Gumaca',
		deadline: new Date(),
		items: [{name: 'Watermelon', quantity: 10, amount: 0}],
		tags: ['Food'],
		images: null,
		comments: [],
	}

const PostSection = ({match}) => {
	// to get the parameter in the link
	const { id } = useParams()

	const [post, setPost] = useState(initialValues)
	const [comments, setComments] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	const addComment = (comment) => {
    setComments((prevState) => ([
      ...prevState,
      comment,
    ]))
  }

  // useEffect(() => {
  // 	const fetchData = async () => {
  // 		try{
	 //      const { data } = await axios.get('/api/post/:id', id)
  // 			setPost(data)
		// 		setIsLoading(!isLoading)
	 //    }catch(error){
	 //      alert(error)
	 //    }
  // 	}
  // }, [])

	return (
		<div>
			<SectionHeader title="Post" />
			{/* Post */}
			<Box px="5">
			<Post data={post} addComment={addComment} isLinked={false}>
				{/* Comment Stack */}
	      <Stack>
	        {
	          comments.map((comment) => {
	            return (
	              <Box borderTop="1px" borderColor="gray.200" mb="4" pt="4">
	                <Flex mb="2">
	                  {/* Avatar */}
	                  <Avatar size="md" name={comment.author} src={comment.avatar} mr="4"/>
	                  {/* Author */}
	                  <Box>
		                  <Text fontWeight="medium" >{comment.author}</Text>
		                  <Text fontFamily="body">{comment.content}</Text>
	                  </Box>
	                </Flex>
	              </Box>
	            )
	          })
	        }
      </Stack>
      </Post>
      </Box>
		</div>
	)
}

export default PostSection