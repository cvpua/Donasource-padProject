import React from 'react'
import { Flex, Avatar, Text, Badge, Box } from '@chakra-ui/core'

const PostHeader = (props) => {
	const { 
		avatar, 
		title, 
		author, 
		deadline: mainDeadline,
    status
	} = props
// Compute for the the time remaining from the deadline
// In terms of days
// If day < 1  then display in terms of hrs
// If hrs < 1 then display in terms of mins
// If mins < 1 then display in terms of sec
// Create a CountdownTimer Component
  const currentDate = new Date()
  const deadline = new Date(mainDeadline)
	const timeRemaining = deadline.getTime() - currentDate.getTime() 

  const daysRemaining = Math.floor(timeRemaining / (1000 * 3600 * 24))
  const hoursRemaining = Math.floor(timeRemaining / (1000 * 3600))
  const minsRemaining = Math.floor(timeRemaining / (1000 * 60))

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
      <Box>
        <Badge 
          variantColor={
            status === "PENDING" ? "pink"
            : status === "UNFULFILLED" ? "brown"
            : "green"
          }
        >
          {
            status !== "PENDING" ? status
            :hoursRemaining <= 1 ? `${minsRemaining} mins left`
            : daysRemaining <= 1 ? `${hoursRemaining} hrs left`
            : `${daysRemaining} days left`
          }
        </Badge>
      </Box>
      </Flex>
    </Flex>
	)
}

export default PostHeader