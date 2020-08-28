import React,{ useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import { Stack, Box, Flex, Avatar, Text } from '@chakra-ui/core'
import Post from './Post.js'
import SectionHeader from './SectionHeader.js'

const INIT_POST = {
		avatar: null,
		author: '',
		title: '',
		description: '',
		type: 'donation',
		location: '',
		deadline: '',
		items: [],
		tags: [],
		images: [],
		comments: [],
		likers: [],
}

const PostSection = ({match}) => {
	// to get the parameter in the link
	const { id: postId } = useParams()

	const [post, setPost] = useState(INIT_POST)
	const [comments, setComments] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	const addComment = (comment) => {
		const newComment = {
			content: comment.content,
			user: {
				avatar: comment.avatar,
				username: comment.username,
				name: comment.name
			}
		}
    setComments((prevState) => ([
      ...prevState,
      newComment,
    ]))
  }

  useEffect(() => {
  	const fetchData = async () => {
  		try{
	      const { data } = await axios.get(`/api/posts/${postId}`)
  			setPost(prevState => ({
  				...prevState,
  				...data,
  			}))
  			setComments(data.comments)
				setIsLoading(false)
	    }catch(error){
	      alert(error)
	    }
  	}
  	fetchData()
  }, [postId])

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
	              <Box key={comment._id} borderTop="1px" borderColor="gray.200" mb="4" pt="4">
	                <Flex mb="2">
	                  {/* Avatar */}
	                  <Avatar size="md" name={comment.user.author} src={comment.user.avatar} mr="4"/>
	                  {/* Author */}
	                  <Box>
		                  <Text fontWeight="bold" >{comment.user.name.firstName + " " + comment.user.name.lastName}</Text>
		                  <Text fontWeight="bold" >{comment.user.username}</Text>
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