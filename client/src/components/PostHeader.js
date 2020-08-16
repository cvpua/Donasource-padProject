import React from 'react'
import { Flex, Avatar, Text, Badge } from '@chakra-ui/core'

const PostHeader = (props) => {
	const { 
		avatar, 
		title, 
		author, 
		deadline 
	} = props
// Compute for the the time remaining from the deadline
// In terms of days
// If day < 1  then display in terms of hrs
// If hrs < 1 then display in terms of mins
// If mins < 1 then display in terms of sec
// Create a CountdownTimer Component
	const timeRemaining = 10

	return (
		<Flex align="center" mb="2">
    	{/* Avatar */}
      <Avatar size="md" name={author} src={avatar} mr="4"/>
      <Flex flexDirection="column">
    	{/* Title */}
      <Text fontWeight="extrabold" >{title}</Text>
      {/* Author */}
      <Text fontWeight="medium" >{author}</Text>
      {/* Deadline */}
      <Badge variantColor="pink">{timeRemaining} days left</Badge>
      </Flex>
    </Flex>
	)
}

export default PostHeader