import React,{ useState, useContext, useEffect } from 'react'
import { IconButton, Flex, Box } from '@chakra-ui/core'
import {AiOutlineHeart,AiFillHeart} from 'react-icons/ai'
import { UserContext } from '../App.js'
import axios from 'axios'
import Toast from './Toast.js'

const LikeButton = (props) => {
	// Post Id
	const { postId, likers } = props

	// User Id
	const [USER] = useContext(UserContext)
	const { user, token } = USER
	const { _id: userId, name, username } = user

	const [isLiked, setIsLiked] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [message, setMessage] = useState()
	const [likes, setLikes] = useState(likers.length)


	const toggle = async () => {
		setIsLoading(true)
		try{
			const { data } = await axios.patch(
				`/api/posts/${postId}/likes`, 
				{userId, name, username},
				{
					headers: {
						'Authorization': 'Bearer ' + token,
					}
				}
			)
			setLikes(prevState => (isLiked ? prevState - 1 : prevState + 1))
			setIsLiked(!isLiked)
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

	useEffect(() => {
		const state = likers.find((liker) => (liker._id === userId ? true : false))
		setIsLiked(state)
	}, [likers, userId])

	return (
		<React.Fragment>
			<Toast message={message} />
			<Flex align="center"> 
				<IconButton 
					variant="ghost"
					icon={isLiked ? AiFillHeart : AiOutlineHeart} 
					rounded="full" 
					size="lg"
					onClick={toggle} 
					color={isLiked ? "red.800" : ""} 
					isLoading={isLoading}	
				/>
				<Box visibility={likes === 0 ? "hidden" : "visible"}>
					{likes}
				</Box>
			</Flex>
		</React.Fragment>
	)
}

export default LikeButton