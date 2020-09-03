import React, { useContext, useState } from 'react'
import Logout from './Logout.js'
import { 
  Flex, Text, Avatar, 
  Grid, Box, Menu, 
  MenuItem, MenuButton, MenuList, 
  MenuDivider, Button, Modal, 
  ModalHeader, ModalBody, ModalContent, 
  ModalFooter, ModalOverlay, ModalCloseButton,
  useDisclosure 
} from '@chakra-ui/core'
import ChangePasswordFormContainer from './ChangePasswordFormContainer.js'
import { UserContext } from '../App.js'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Toast from './Toast.js'


const Header = (props) => {
	const { title } = props

  const [USER, setUser] = useContext(UserContext)
  const { user, token } = USER
  const {
    photo,
    name,
  } = user
  const fullName = name.firstName + " " + name.lastName

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState()

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
      localStorage.removeItem("user")
      setUser()
    }catch(error){
      setMessage({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      })
    }
  }

	return (
    <React.Fragment>
    <Toast message={message} />
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
        <Link to="/">
          { title }
        </Link>
      </Text>
    
      {/* Account */}
       <Flex alignItems="center" justify="flex-end" mr="4">
          <Menu>
            <MenuButton as={Button} variantColor="black" px="2" variant="solid" rightIcon="chevron-down" _hover={{bg: "cyan.500"}} _active={{bg: "cyan.400"}} >
              <Avatar src={photo} size="sm" name={fullName} mr={{base: "0", lg: "2"}} />
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
              <MenuItem leftIcon="add" onClick={onOpen} >Change Password</MenuItem>
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

    {/* Change Password Form Modal */}
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Comment Form */}
            <ChangePasswordFormContainer onClose={onClose} handleIsSubmitting={setIsSubmitting} />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={() => {
              onClose()
              setIsSubmitting(false)
            }}>
              Cancel
            </Button>
            <Button variantColor="cyan" type="submit" isLoading={isSubmitting} form="changePasswordForm">Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </React.Fragment>
	)
}

export default Header