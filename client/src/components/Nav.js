import React from 'react'
import { Link } from 'react-router-dom'
import { Flex, Button } from '@chakra-ui/core'
import { FaHome, FaBell, FaList, FaUserAlt } from 'react-icons/fa'

const Nav = () => {
	return (
		<Flex 
      flexDirection="column"
      justifyContent="space-between"
      h="40vh"
    >
      <Button as={Link} to="/home" variantColor="cyan" variant="solid" size="lg" leftIcon={FaHome}>
         Home
      </Button>
      <Button as={Link} to="/notification" variantColor="cyan" variant="solid" size="lg" leftIcon={FaBell}>
        Notification
      </Button>
      <Button as={Link} to="/avails" variantColor="cyan" variant="solid" size="lg" leftIcon={FaList}>
        Avails
      </Button>
      <Button as={Link} to="/profile" variantColor="cyan" variant="solid" size="lg" leftIcon={FaUserAlt}>
        Profile
      </Button>
    </Flex>
	)
}

export default Nav