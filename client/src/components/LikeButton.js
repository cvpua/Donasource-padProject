import React,{ useState, useContext } from 'react'
import { IconButton } from '@chakra-ui/core'
import {FaHeart} from 'react-icons/fa'
import { UserContext } from '../App.js'
import axios from 'axios'

const LikeButton = (props) => {
	// Post Id
	const { id: postId, likers } = props

	// User Id
	const USER = useContext(UserContext)
	const { user } = USER
	const { _id: userId } = user

	const state = likers.find((liker) => (liker._id === userId ? true : false))

	const [isLiked, setIsLiked] = useState(state)

	const toggle = async () => {
		try{
			const { data } = await axios.patch(`/api/posts/${postId}/likes`, {userId})
			alert(data.message)
			setIsLiked(!isLiked)
		}catch(error){
			alert(error.message)
		}
	}

	return (
		<IconButton variant="ghost" isRound onClick={toggle} color={isLiked ? "red.800" : ""} icon={FaHeart} />
	)
}

export default LikeButton