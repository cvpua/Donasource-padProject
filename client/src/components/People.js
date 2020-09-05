import React, { useState, useEffect } from 'react'
import { Flex, Text, Box, Divider, AvatarGroup, Avatar, Button, useDisclosure, Modal, ModalHeader, ModalContent, ModalBody, ModalOverlay, ModalCloseButton } from '@chakra-ui/core'
import { Link } from 'react-router-dom'

const People = ({items, type}) => {
	const [people, setPeople] = useState([])

	const isEmpty = people.length === 0 ? true : false

	const { isOpen, onOpen, onClose } = useDisclosure()

	useEffect(() => {
		const array = []
		items.forEach((item) => {
			item.donor.forEach((e) => {
				if (e.amountDonated === 0) {
					return
				}
				array.push({
					...e.user,
					amountDonated: e.amountDonated,
					itemName: item.name,
				})
			})
		})

		items.forEach((item) => {
			item.donee.forEach((e) => {
				if (e.amountRequested === 0){
					return
				}
				array.push({
					...e.user,
					amountRequested: e.amountRequested,
					itemName: item.name,
				})
			})
		})

		setPeople(prevState => ([
			...array,
			...prevState
		]))
	}, [items])

	return (
		<React.Fragment>
		<Flex align="center" d={isEmpty ? "none" : "flex"}>
		 	<Button variant="ghost" px="1" onClick={onOpen} >
      <Text fontSize="sm" mr="2">{type === "request" ? "Donor" : "Donee"}:</Text>
      <AvatarGroup size="sm" max={3} >
       	{
          people.map((user,i) => {
          	if (!user.name){
          		return(null)
          	}
          	const fullName = user.name.firstName + " " + user.name.lastName
          	return <Avatar key={i} src={user.avatar && user.avatar.url} name={fullName} />	
          })
       	}
      </AvatarGroup>
      </Button>
    </Flex>

	  <Modal isOpen={isOpen} onClose={onClose}>
	      <ModalOverlay />
	      <ModalContent>
	        <ModalHeader>{type === "request" ? "Donor" : "Donee"}</ModalHeader>
	        <ModalCloseButton />
	        <ModalBody>
	        	{
	        		people.map((user,i) => {
	        			if (!user.name){
	        				return(null)
	        			}
	        			return <React.Fragment key={i}>
	        				<Flex align="center" mb="1">
	        					<Link to={`/${user.username}`}>
	        						<Avatar size="sm" mr="2" src={user.avatar && user.avatar.url} name={`${user.name.firstName} ${user.name.lastName}`} />
	        					</Link>
	        					<Box>
	        						<Text fontSize="sm" fontWeight="semibold" mr="1">{`${user.name.firstName} ${user.name.lastName}`}</Text>
	        						<Text fontSize="sm" color="gray.700">{`@${user.username}`}</Text>
	        					</Box>
	        				</Flex>
	        				<Text fontSize="sm">{`Item: ${user.itemName}`}</Text>
	        				<Text fontSize="sm">{type=== "donation" ? `Amount Requested: ${user.amountRequested}` : `Amount Donated: ${user.amountDonated}`}</Text>
	        				
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

export default People