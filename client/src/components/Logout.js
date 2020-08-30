import React, {useContext} from 'react'
import { Flex, Button, Box, Text } from '@chakra-ui/core'
import { Link } from 'react-router-dom'
import { BiLogOut } from 'react-icons/bi'
import { UserContext } from '../App.js'
import axios from 'axios'

const Logout = () => {
	const [user, setUser] = useContext(UserContext)

  const { token } = user
  
	const logout = async () => {
		try {
      const { data } = await axios.post(
        '/api/logout',
        {}, 
        {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        }
      )
      localStorage.clear();
      alert(data.message)
      setUser()
    }catch(error){
      alert(error.message)
    }
	}

	return (
			<Flex 
        as={Link} 
        to="/" 
        p="2" 
        rounded="full"
        onClick={logout}
      >
        <Box ml="4" as={BiLogOut} size="8" color="primary.600" />
        <Text color="primary.600" fontWeight="bold" fontFamily="Ubuntu" fontSize="xl" lineHeight="tall" ml="1">Logout</Text>
      </Flex>
	)
}

export default Logout