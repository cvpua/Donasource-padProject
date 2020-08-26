import React, {useContext} from 'react'
import { Flex, Button } from '@chakra-ui/core'
import { Link } from 'react-router-dom'
import { RiLogoutBoxLine } from 'react-icons/ri'
import { UserContext } from '../App.js'

const Logout = () => {
	const [user, setUser] = useContext(UserContext)

	const logout = () => {
		localStorage.removeItem('user')
		setUser()
	}

	return (
		<Flex flexDirection="column">
      <Button as={Link} to="/" onClick={logout} variantColor="cyan" variant="solid" size="lg" leftIcon={RiLogoutBoxLine}>
         Logout
      </Button>
    </Flex>
	)
}

export default Logout