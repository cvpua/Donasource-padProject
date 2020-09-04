import React,{useState} from 'react'
import { Box, Flex, Avatar, Text, Collapse, Button, Divider, Badge } from '@chakra-ui/core'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Toast from './Toast.js'
import { BiCheckboxSquare } from 'react-icons/bi'

const Avail = ({avail, userId}) => {
	const {
		_id: availId, 
		user, 
		post, 
		reason,  
		date: mainDate,
		items, 
	} = avail

	const { avatar, name, username } = user
	const { _id: postId, title } = post

	const fullName = name.firstName + " " + name.lastName
	const currentDate = new Date()
	const date = new Date(mainDate)
 	const time = currentDate.getTime() - date.getTime()

 	const days = Math.floor(time / (1000 * 3600 * 24))
  const hours = Math.floor(time / (1000 * 3600))
  const mins = Math.floor(time / (1000 * 60))
  const sec = Math.floor(time / (1000))

  const [show, setShow] = useState(false)
  const [message, setMessage] = useState()
  const [isSubmitting, setIsSubmitting] = useState(false)

	const acceptRequest = async () => {
		console.log('Accept Request')
		setIsSubmitting(true)
		try{
			const { data } = await axios.patch(`/api/users/${userId}/avails/${availId}`, {response: "ACCEPT"})
			setIsSubmitting(false)
		}catch(error){
			alert(error.message)
			setMessage({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      })
		}
	}

	const rejectRequest = async () => {
		setIsSubmitting(true)
		try{
			const { data } = await axios.patch(`/api/users/${userId}/avails/${availId}`, {response: "REJECT"})
			setIsSubmitting(false)
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
			<Box pt="4" px="6">
				<Flex align="center"rounded="lg" pb="4">
					{/* Avatar */}
					<Link to={`/${username}`}>
						<Avatar name={fullName} src={avatar} />
					</Link>
					<Box ml="4">
					{/* Name */}
					<Text>
						<b>{fullName + " "}</b>
						requests on your donation: 
						<Link to={`/post/${postId}`}><b>{` "${title}"`}</b></Link>
					</Text>
					{/* Time */}
					<Text fontSize="sm" color="gray.700">
						{
								hours >= 24 ? `${days}d ago`
								: mins >= 60 ? `${hours}hr ago`
								: sec >= 60 ? `${mins}min ago`
								: `${sec} sec ago`
						}
					</Text>
					</Box>
				</Flex>
				<Box p="2" bg="blue.100" rounded="lg" mb="2">
					<Collapse startingHeight={32} isOpen={show} ml="4" mt="2">
						<Text fontWeight="bold">Items requested:</Text>
						{
							items.map((item) =>(
								<Flex ml="4" align="center">
									<Box as={BiCheckboxSquare} mr="2"/>
									<Text fontSize="sm">{item.itemId.name}</Text>
									<Badge ml="2" variantColor="orange">{item.amountRequested}</Badge>
								</Flex>
							))
						}
						<Divider />
						<Text mt="2" fontWeight="bold">Reason:</Text>
		        <Text ml="4" fontSize="sm">{reason}</Text>
		      </Collapse>
		      <Button ml="4" mt="1" size="sm" variant="ghost" variantColor="blue" onClick={() => setShow(!show)} >
		        Show {show ? "Less" : "More"}
		      </Button>
		     </Box>
		    <Flex justify="flex-end">
					<Button size="sm" isLoading={isSubmitting} onClick={() => rejectRequest()} >Reject</Button>
					<Button size="sm" isLoading={isSubmitting} onClick={() => acceptRequest()} variantColor="cyan" ml="2">Accept</Button>
				</Flex>
			</Box>
			<Divider />
		</React.Fragment>
	)
}

export default Avail