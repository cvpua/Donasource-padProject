import React from 'react'
import { NavLink } from 'react-router-dom'
import { Flex, IconButton, Box, Text, PseudoBox } from '@chakra-ui/core'
import { BiHomeSmile, BiBell, BiFace, BiMessageAltDetail, BiPlus } from 'react-icons/bi'

const Nav = (props) => {
  const { variant, ...rest } = props

	return (
    variant === "side" ?
  		<Flex 
        flexDirection="column"
        justifyContent="space-around"
        h="40vh"
        {...rest}
      >
        <NavLink exact to="/" activeclassname="active">
          <Flex  
            p="2" 
          >
            <Box ml="4" as={BiHomeSmile} size="8" color="primary.600" />
            <Text color="primary.600" fontWeight="bold" fontFamily="Ubuntu" fontSize="xl" lineHeight="tall" ml="1">Home</Text>
          </Flex>
        </NavLink>
        <Flex 
          as={NavLink} 
          to="/notification" 
          p="2" 
          activeClassname="active"
          rounded="full" 
        >
          <Box ml="4" as={BiBell} size="8" color="primary.600" />
          <Text color="primary.600" fontWeight="bold" fontFamily="Ubuntu" fontSize="xl" lineHeight="tall" ml="1">Notification</Text>
        </Flex>
        <Flex 
          as={NavLink} 
          to="/avails" 
          p="2" 
          activeClassname="active"
          rounded="full" 
        >
          <Box ml="4" as={BiMessageAltDetail} size="8" color="primary.600" />
          <Text color="primary.600" fontWeight="bold" fontFamily="Ubuntu" fontSize="xl" lineHeight="tall" ml="1">Avails</Text>
        </Flex>
        <Flex 
          as={NavLink} 
          to="/profile" 
          p="2" 
          activeClassname="active"
          rounded="full" 
        >
          <Box ml="4" as={BiFace} size="8" color="primary.600" />
          <Text color="primary.600" fontWeight="bold" fontFamily="Ubuntu" fontSize="xl" lineHeight="tall" ml="1">Profile</Text>
        </Flex>
      </Flex>
    : 
      <Flex pos="fixed" bottom="0" bg="gray.50" justify="space-evenly" w="full" py="2" {...rest} >
        {/* Home */}
        <NavLink exact to="/" activeclassname="active" > 
          <Box
            p="2" 
            rounded="lg" 
          >
            <Box as={BiHomeSmile} size="8" color="primary.600" />
        </Box>
        </NavLink>
        {/* Avails */}
        <Box 
          as={NavLink} 
          to="/avails" 
          p="2"
          rounded="lg" 
          activeClassname="active"
        >
          <Box as={BiMessageAltDetail} size="8" color="primary.600" />
        </Box>
        {/* Notification */}
        <Box 
          as={NavLink} 
          to="/notification" 
          p="2"
          rounded="lg" 
          activeClassname="active"
        >
          <Box as={BiBell} size="8" color="primary.600" />
        </Box>
        {/* Profile */}
        <Box 
          as={NavLink} 
          to="/profile"
          p="2"
          rounded="lg" 
          activeClassname="active"
        >
          <Box as={BiFace} size="8" color="primary.600" />
        </Box>
    </Flex>
	)
}

export default Nav