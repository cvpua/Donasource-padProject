import React from 'react'
import { Flex, Text, Box } from '@chakra-ui/core'
import BackButton from './BackButton.js'

const SectionHeader = (props) => {
	const { title, hasBackButton } = props

	return (
		<Flex 
      h="16"  
      zIndex="sticky" 
      align="center"
      pl="2"
      pos="sticky"
      top="0"
      bg="gray.100"
    >
      {
        hasBackButton && <BackButton />
      }
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