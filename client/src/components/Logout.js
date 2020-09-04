import React from 'react'
import { Flex, Box, Text } from '@chakra-ui/core'
import { BiLogOut } from 'react-icons/bi'

const Logout = () => {
	return (
			<Flex>
        <Flex>
          <Box as={BiLogOut} size="6" color="primary.600" />
          <Text color="gray.800" fontFamily="Ubuntu" fontSize="md" ml="1">Logout</Text>
        </Flex>
      </Flex>
	)
}

export default Logout