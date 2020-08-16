import React,{ useState } from 'react'
import { IconButton } from '@chakra-ui/core'
import {FaHeart} from 'react-icons/fa'

const LikeButton = () => {
	const [isLiked, setIsLiked] = useState(false)

	const toggle = () => {
		setIsLiked(!isLiked)
	}

	return (
		<IconButton variant="ghost" isRound onClick={toggle} color={isLiked ? "red.800" : ""} icon={FaHeart} />
	)
}

export default LikeButton