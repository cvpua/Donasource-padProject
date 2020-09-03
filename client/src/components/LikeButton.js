import React,{ useState, useContext, useEffect } from 'react'
import { IconButton } from '@chakra-ui/core'
import {AiOutlineHeart,AiFillHeart} from 'react-icons/ai'
import { UserContext } from '../App.js'
import axios from 'axios'
import Toast from './Toast.js'

const LikeButton = (props) => {
	// Post Id
	const { postId, likers } = props

	// User Id
	const [USER] = useContext(UserContext)
	const { user } = USER
	const { _id: userId, name, username } = user

	const [isLiked, setIsLiked] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [message, setMessage] = useState()

	const toggle = async () => {
		setIsLoading(true)
		try{
			const { data } = await axios.patch(`/api/posts/${postId}/likes`, {userId, name, username})
			setIsLoading(false)
			setIsLiked(!isLiked)
		}catch(error){
			setMessage({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      })
		}
	}

	useEffect(() => {
		const state = likers.find((liker) => (liker === userId ? true : false))
		setIsLiked(state)
	}, [likers, userId])

	return (
		<React.Fragment>
		<Toast message={message} />
		<IconButton 
			variant="ghost"
			icon={isLiked ? AiFillHeart : AiOutlineHeart} 
			isRound 
			size="lg"
			onClick={toggle} 
			color={isLiked ? "red.800" : ""} 
			isLoading={isLoading}			
		/>
		</React.Fragment>
	)
}

export default LikeButton