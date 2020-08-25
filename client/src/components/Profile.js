import React,{ useContext, useState, useEffect } from 'react'
import {	Avatar, Text, Box, Flex, Stat, StatGroup, StatLabel, StatNumber, Menu, MenuItem, MenuButton, MenuList, IconButton } from '@chakra-ui/core'
import SectionHeader from './SectionHeader.js'
import { FaUserAlt, FaLocationArrow, FaSms, FaAt } from 'react-icons/fa'
import Feed from './Feed.js'
import { UserContext } from '../App.js'
import axios from 'axios'
import {FiEdit} from 'react-icons/fi'

// Dapat pala userid na lang yung nilalagay sa Comment Form at Post Form

const INIT_PROFILE = {
	username: '',
	name: {
		firstName: '',
		lastName: '',
	},
	photo: null,
	email: '',
	location: '',
	contactNumber: '',
	bio: '',
	donationCount: 0,
	requestCount: 0,
	posts: [],
}


const Profile = () => {
	const USER = useContext(UserContext)
	const { user } = USER
	const { _id: userId } = user

	const [profile, setProfile] = useState(INIT_PROFILE)

	const [feed, setFeed] = useState(profile.posts)

	const fullName = profile.name.firstName + " " + profile.name.lastName
	const createPost = (post) => {
		const newPost = {
			...post,
			likers: [],
			comments: []
		}
		setFeed((prevState) => ([
			...prevState,
			newPost,
		]))
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await axios.get(`/api/users/${userId}`)
				setProfile(data.user)
				setFeed(data.user.posts)
				alert('Success')
			}catch(error){
				alert(error.message)
			}
 		}
 		fetchData()
	}, [userId])

	return (
		<div>
			<SectionHeader title="Profile" icon={FaUserAlt} />
			<Box mx="4" shadow="md" bg="gray.50" rounded="lg">
				<Flex justify="flex-end">
					<IconButton variant="ghost" icon={FiEdit} size="lg" m="2"/>
				</Flex>
				<Flex pb="4" borderBottom="4px" borderColor="gray.200" mb="4" flexDirection="column" justify="center" align="center">
					{/* Avatar */}
					<Avatar size="2xl" src={profile.photo} name={fullName} mb="2"/>
					{/* Name */}
					<Text fontSize="2xl" fontWeight="semibold">{fullName}</Text>
					{/* Username */}
					<Text fontWeight="light">@{profile.username}</Text>

					{/* Bio */}
					<Flex px="8" pb="4" justify="center" >
						<Text textAlign="center">{profile.bio}</Text>
					</Flex>
					<Flex flexDirection="column" mt="2">
						{/* Location */}
						<Flex align="center" justify="center">
							<Box as={FaLocationArrow} color="primary.600" />
							<Text ml="2">{profile.location}</Text>
						</Flex>
						{/* Email */}
						<Flex align="center" justify="center">
							<Box as={FaAt} color="primary.600" />
							<Text ml="2">{profile.email}</Text>
						</Flex>
						{/* Contact */}
						<Flex align="center" justify="center">
							<Box as={FaSms} color="primary.600" />
							<Text ml="2">{profile.contactNumber}</Text> 
						</Flex>
					</Flex>
					<StatGroup >
						{/* Donations */}
					  <Stat d="flex" p="4" flexDirection="column" justifyContent="center" alignItems="center">
					    <StatNumber>{profile.donationCount}</StatNumber>
					    <StatLabel color="primary.600">Donations</StatLabel>
					  </Stat>
					  {/* Requests */}
					  <Stat d="flex" p="4" flexDirection="column" justifyContent="center" alignItems="center">
					    <StatNumber>{profile.requestCount}</StatNumber>
					    <StatLabel color="primary.600" >Requests</StatLabel>
					  </Stat>
					</StatGroup>
				</Flex>
				<Feed 
					posts={feed}
	      	createPost={createPost}
				/>
			</Box>
		</div>
	)
}

export default Profile