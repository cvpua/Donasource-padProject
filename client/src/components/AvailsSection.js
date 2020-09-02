import React, { useState, useEffect, useContext } from 'react'
import {Box, Flex, Avatar, Text, Divider, Button, Collapse, Spinner} from '@chakra-ui/core'
import SectionHeader from './SectionHeader.js'
import {BiMessageAltDetail, BiMessageAltX} from 'react-icons/bi'
import Avail from './Avail.js'
import axios from 'axios'
import {UserContext} from '../App.js'

const INIT_AVAILS =  [
	{
		name: {
			firstName: "Marco",
			lastName: "Mirandilla"
		},
		postId: "12345",
		reason: "Gusto ko lang po ng ayuda.",
		title: "Penge Ayuda",
		date: new Date(),
		avatar: null,
	},
	{
		name: {
			firstName: "Marco",
			lastName: "Mirandilla"
		},
		postId: "12345",
		reason: "Gusto ko lang po ng ayuda.",
		title: "Penge Ayuda",
		date: new Date(),
		avatar: null,
	},
	{
		name: {
			firstName: "Marco",
			lastName: "Mirandilla"
		},
		postId: "12345",
		reason: "Gusto ko lang po ng ayuda.",
		title: "Penge Ayuda",
		date: new Date(),
		avatar: null,
	},
]

const AvailsSection = () => {
	const [USER] = useContext(UserContext)
	const { user } = USER
	const { _id: userId } = user

	const [avails, setAvails] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try{
				const { data } = await axios.get(`/api/users/${userId}/avails`)
				setAvails(prevState => ([
					...prevState,
					data.avail,
				]))
				setIsLoading(false)
			}catch(error){
				alert(error.message)
				setIsLoading(false)
			}
		}
		fetchData()
	}, [])

	return (
		<React.Fragment>
			<SectionHeader title="Avails" icon={BiMessageAltDetail} />
			{
				isLoading ? 
					<Flex justify="center" pt="8" >
						<Spinner
						  thickness="6px"
						  speed="0.65s"
						  emptyColor="gray.200"
						  color="primary.600"
						  size="xl"
						/>
					</Flex>
				: avails.length === 0 ?
					<Flex align="center" py="8" flexDirection="column">
            <Box as={BiMessageAltX} size="20" />
            <Text fontWeight="bold" fontSize="lg">No one has requested yet.</Text>
            <Text>You can post more donations to get more request.</Text>
          </Flex>
        :
					<Box mx="4" rounded="lg" bg="white" shadow="sm" pb="2">
						<Divider />
							{
								avails.map((avail) => {
									return (<Avail avail={avail} />)
								})
							}
					</Box>
			}
		</React.Fragment>
	)
}

export default AvailsSection