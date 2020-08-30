import React, { useContext } from 'react'
import Logout from './Logout.js'
import { Flex, Text, Avatar, Grid, Box, Menu, MenuItem, MenuButton, MenuList, MenuDivider, Button } from '@chakra-ui/core'
import { UserContext } from '../App.js'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Header = (props) => {
	const { title } = props

  const [USER, setUser] = useContext(UserContext)

  const { user, token } = USER

  const {
    photo,
    name,
  } = user

  const fullName = name.firstName + " " + name.lastName

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
      alert(data.message)
      localStorage.removeItem("user")
      setUser()
    }catch(error){
      alert(error.message)
    }
  }

	return (
		<Grid 
      h="16" 
      bg="primary.600" 
      zIndex="banner" 
      templateColumns={{base: "repeat(2, 1fr)", md: "repeat(3, 1fr)"}}
    >
      <Box d={{base: "none", md: "block"}}>
      </Box>
      <Text 
        fontFamily="Ubuntu" 
        fontSize={["2xl","4xl"]} 
        fontWeight="bold" 
        color="cyan.50"
        margin="auto"
      >
        { title }
      </Text>

      {/* Account */}
       <Flex alignItems="center" justify="flex-end" mr="4">
          <Menu>
            <MenuButton as={Button} variantColor="black" px="2" variant="solid" rightIcon="chevron-down" _hover={{bg: "cyan.500"}} _active={{bg: "cyan.400"}} >
              <Avatar src="photo" size="sm" name={fullName} mr={{base: "0", lg: "2"}} />
              <Text 
                color="cyan.50" 
                fontFamily="Ubuntu"
                fontSize="sm"
                d={{base: "none", lg: "block"}}
              >
                {fullName}
              </Text>
            </MenuButton>
            <MenuList zIndex="popover">
              <MenuItem leftIcon="add">Change Password</MenuItem>
              <MenuDivider />
              <MenuItem 
                as={Link} 
                to="/"
                onClick={logout} 
              >
                <Logout />
              </MenuItem>
            </MenuList>
          </Menu>
          
        </Flex>
    </Grid>
	)
}

export default Header