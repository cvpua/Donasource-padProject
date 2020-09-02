import React,{ useState, useContext, useEffect } from 'react'
import { IconButton } from '@chakra-ui/core'
import {AiOutlineHeart,AiFillHeart} from 'react-icons/ai'
import { UserContext } from '../App.js'
import axios from 'axios'

const LikeButton = (props) => {
	// Post Id
	const { postId, likers } = props

	// User Id
	const [USER] = useContext(UserContext)
	const { user } = USER
	const { _id: userId, name, username } = user

	const [isLiked, setIsLiked] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const toggle = async () => {
		setIsLoading(true)
		try{
			const { data } = await axios.patch(`/api/posts/${postId}/likes`, {userId, name, username})
			setIsLoading(false)
			setIsLiked(!isLiked)
		}catch(error){
			alert(error.message)
		}
	}

	useEffect(() => {
		const state = likers.find((liker) => (liker === userId ? true : false))
		setIsLiked(state)
	}, [likers, userId])

	return (
		<IconButton 
			variant="ghost"
			icon={isLiked ? AiFillHeart : AiOutlineHeart} 
			isRound 
			size="lg"
			onClick={toggle} 
			color={isLiked ? "red.800" : ""} 
			isLoading={isLoading}			
		/>
	)
}

export default LikeButton