import React,{useState} from 'react'
import { Box, Flex, Avatar, Text, Collapse, Button, Divider } from '@chakra-ui/core'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Avail = ({avail}) => {
	const {
		_id: availId, 
		user, 
		post, 
		reason,  
		date, 
	} = avail

	const {_id: userId, avatar, name, username } = user
	const { _id: postId, title } = post

	const fullName = name.firstName + " " + name.lastName
	const currentDate = new Date()
 	const time = currentDate.getTime() - date.getTime()

 	const days = Math.floor(time / (1000 * 3600 * 24))
  const hours = Math.floor(time / (1000 * 3600))
  const mins = Math.floor(time / (1000 * 60))
  const sec = Math.floor(time / (1000))

  const [show, setShow] = useState(false)

	const acceptRequest = async () => {
		try{
			const { data } = axios.patch(`/api/posts/${postId}/avails/${availId}`)
		}catch(error){
			alert(error.message)
		}
	}

	const rejectRequest = async () => {
		try{
			const { data } = axios.delete(`/api/posts/${postId}/avails/${availId}`)
		}catch(error){
			alert(error.message)
		}
	}

	return (
		<React.Fragment>
			<Box pt="4" px="6">
				<Flex align="center"rounded="lg" pb="4">
					{/* Avatar */}
					<Avatar name={fullName} src={avatar} />
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
							sec > 60 ? `${mins} min ago`
							: mins > 60 ? `${hours} hr ago`
							: hours > 24 ? `${days} d ago`
							: `${sec} sec ago`
						}
					</Text>
					</Box>
				</Flex>
				<Box p="2" bg="blue.100" rounded="lg" mb="2">
					<Collapse startingHeight={32} isOpen={show} ml="4" mt="2">
		        {reason}
		      </Collapse>
		      <Button ml="4" mt="1" size="sm" variant="ghost" variantColor="blue" onClick={() => setShow(!show)} >
		        Show {show ? "Less" : "More"}
		      </Button>
		     </Box>
		    <Flex justify="flex-end">
					<Button size="sm" onClick={() => rejectRequest()} >Reject</Button>
					<Button size="sm" onClick={() => acceptRequest()} variantColor="cyan" ml="2">Accept</Button>
				</Flex>
			</Box>
			<Divider />
		</React.Fragment>
	)
}

export default Avail