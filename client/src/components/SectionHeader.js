import React from 'react'
import { Flex, Text, Box } from '@chakra-ui/core'

const SectionHeader = (props) => {
	const { title } = props

	return (
		<Flex 
      h="16"  
      zIndex="banner" 
      align="center"
      pl="5"
      pos="sticky"
      top="0"
      bg="gray.100"
    >
      <Box as={props.icon} size="6" color="cyan.700" mr="2"></Box>
      <Text 
      	fontFamily="heading" 
      	fontWeight="semibold" 
      	fontSize="2xl" 
      	color="primary"
      >
      	{ title }
      </Text>
    </Flex>
	)
}

export default SectionHeader