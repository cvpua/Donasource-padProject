import React from 'react'
import { Flex, Text, Box, Divider, AvatarGroup, Avatar, Button, useDisclosure, Modal, ModalHeader, ModalContent, ModalBody, ModalOverlay, ModalCloseButton } from '@chakra-ui/core'
import { Link } from 'react-router-dom'
const Likers = ({likers}) => {
	const isEmpty = likers.length === 0
	const { isOpen, onOpen, onClose } = useDisclosure()

	return (
		<React.Fragment>
		<Flex align="center" d={isEmpty ? "none" : "flex"}>
			<Button variant="ghost" px="1" onClick={onOpen} >
	      <Text fontSize="sm" mr="2">Likers:</Text>
	      <AvatarGroup size="sm" max={3}>
	        {
	          likers.map((user) => {
	            if (!user.name) {
	            	return
	            }
	            return <Avatar src={user.avatar} name={`${user.name.firstName} ${user.name.lastName}`} />
	          })
	        }
	      </AvatarGroup>
      </Button>
    </Flex>

    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Likers</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          	{
          		likers.map((user) => {
          			if (!user.name) {
          				return
          			}
          			return <React.Fragment>
          				
          				<Flex align="center">
          					<Link to={`/${user.username}`}>
          					<Avatar size="sm" mr="2" src={user.avatar} name={`${user.name.firstName} ${user.name.lastName}`} />
          					</Link>
          					<Box>
          						<Text fontSize="sm" fontWeight="semibold" mr="1">{`${user.name.firstName} ${user.name.lastName}`}</Text>
          						<Text fontSize="sm" color="gray.700">{`@${user.username}`}</Text>
          					</Box>
          				</Flex>
          				
          				<Divider />
          			</React.Fragment>
          		})
          	}
          </ModalBody>
        </ModalContent>
      </Modal>

    </React.Fragment>
	)
}

export default Likers