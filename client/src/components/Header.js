import React from 'react'
import { Flex, Text } from '@chakra-ui/core'

const Header = (props) => {
	const { title } = props

	return (
		<Flex 
      h="16" 
      bg="cyan.500" 
      zIndex="banner" 
      justify="center" 
      align="center"
    >
      <Text 
        fontFamily="heading" 
        fontSize={["2xl","4xl"]} 
        fontWeight="bold" 
        color="white"
      >
        { title }
      </Text>
    </Flex>
	)
}

export default Header