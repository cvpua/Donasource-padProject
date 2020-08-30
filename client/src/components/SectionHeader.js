import React from 'react'
import { Flex, Text, Box } from '@chakra-ui/core'

const SectionHeader = (props) => {
	const { title } = props

	return (
		<Flex 
      h="16"  
      zIndex="sticky" 
      align="center"
      pl="5"
      pos="sticky"
      top="0"
      bg="gray.100"
    >
      <Box as={props.icon} size="6" color="primary.600" mr="2"></Box>
      <Text 
      	fontFamily="Ubuntu" 
      	fontWeight="semibold" 
      	fontSize="2xl" 

      >
      	{ title }
      </Text>
    </Flex>
	)
}

export default SectionHeader