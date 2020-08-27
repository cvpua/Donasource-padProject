import React from 'react'
import { Flex, Text } from '@chakra-ui/core'

const Header = (props) => {
	const { title } = props

	return (
		<Flex 
      h="16" 
      bg="primary.600" 
      zIndex="banner" 
      justify="center" 
      align="center"
    >
      <Text 
        fontFamily="Ubuntu" 
        fontSize={["2xl","4xl"]} 
        fontWeight="bold" 
        color="cyan.50"
      >
        { title }
      </Text>
    </Flex>
	)
}

export default Header