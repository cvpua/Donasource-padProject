import React from 'react'
import { Flex, Tag, Text } from '@chakra-ui/core'

// To do:
// 	Tags should have colors accordingly

const Tags = (props) => {
	const { tags } = props

	return (
		<Flex align="center" my="2">
      <Text>Tags:</Text>
    	{/* Tag */}
    	{
    		tags.map((tag,i) => (
    			<Tag key={i} mx="1">{tag}</Tag>
    		))
    	}
    </Flex>
	)
}

export default Tags