import React from 'react'
import { Flex, Tag, Text, Stack } from '@chakra-ui/core'

// To do:
// 	Tags should have colors accordingly

const Tags = (props) => {
	const { tags } = props

	return (
    	<Flex align="center" my="2">
            <Text>Tags:</Text>
            <Stack spacing={1} isInline >
            	{/* Tag */}
            	{
            		tags.map((tag,i) => (
            			<Tag key={i}>{tag}</Tag>
            		))
            	}
            </Stack>
        </Flex>
	)
}

export default Tags