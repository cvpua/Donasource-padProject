import React from 'react'
import { Flex, Button } from '@chakra-ui/core'
import { Link } from 'react-router-dom'
import { RiLogoutBoxLine } from 'react-icons/ri'

const Logout = () => {
	return (
		<Flex flexDirection="column">
      <Button as={Link} to="/" variantColor="cyan" variant="solid" size="lg" leftIcon={RiLogoutBoxLine}>
         Logout
      </Button>
    </Flex>
	)
}

export default Logout