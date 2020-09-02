import React, { useState, useEffect, useContext } from 'react'
import {Box, Flex, Avatar, Text, Divider, Button, Collapse} from '@chakra-ui/core'
import SectionHeader from './SectionHeader.js'
import {BiMessageAltDetail} from 'react-icons/bi'
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

	useEffect(() => {
		const fetchData = async () => {
			try{
				const { data } = axios.get(`/api/users/${userId}/avails`)
				setAvails(data.avails)
			}catch(error){
				alert(error.message)
			}
		}
	}, [])

	return (
		<React.Fragment>
			<SectionHeader title="Avails" icon={BiMessageAltDetail} />
			<Box mx="4" rounded="lg" bg="white" shadow="sm" pb="2">
				<Divider />
					{
						avails.map((avail) => {
							return (<Avail avail={avail} />)
						})
					}
			</Box>
		</React.Fragment>
	)
}

export default AvailsSection