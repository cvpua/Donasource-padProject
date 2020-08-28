import React from 'react'
import { Skeleton, Box, Flex } from '@chakra-ui/core'

const PostSkeleton = () => {
	return (
		<Box p="5" mb="4" shadow="sm" bg="white" rounded="lg" pos="relative" _hover={{ borderColor: "gray.200", bg: "gray.50" }}>
			{/* Post Header */}
			<Flex align="center" mb="2">
	    	{/* Avatar */}
	    	<Skeleton h="12" w="12" rounded="full" mr="4" />
	      <Flex flexDirection="column">
		    	{/* Title */}
		    	<Skeleton h="4" w="64" my="1"/>
		      {/* Author */}
		      <Skeleton h="4" w="40" my="1"/>
		      {/* Deadline */}
		      <Skeleton h="4"  w="20" my="1"/>
	      </Flex>
      </Flex>
      {/* Post Content */}
      <Box my="4">
        <Skeleton h="4" my="1"/>
        <Skeleton h="4" my="1"/>
        <Skeleton h="4" my="1"/>
        <Skeleton h="4" my="1"/>
      </Box>
      <Skeleton h="24" my="2"/>
      <Skeleton h="6" w="32" my="2"/>
		</Box>
	)
}

export default PostSkeleton