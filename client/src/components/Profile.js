import React,{ useState, useEffect } from 'react'
import {	
	Avatar, Text, Box, 
	Flex, Stat, StatGroup, 
	StatLabel, StatNumber, 
	IconButton, Spinner, useDisclosure,
	Modal, ModalHeader, ModalBody, 
  ModalContent, ModalOverlay, ModalFooter, 
  ModalCloseButton, Button,
} from '@chakra-ui/core'
import SectionHeader from './SectionHeader.js'
import {BiFace, BiEdit, BiCompass, BiEnvelope, BiPhone} from 'react-icons/bi'
import Feed from './Feed.js'
import EditProfileFormContainer from './EditProfileFormContainer.js'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import Toast from './Toast.js'

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
	const { username } = useParams()

	const { isOpen, onOpen, onClose } = useDisclosure()
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [message, setMessage] = useState()

	const [profile, setProfile] = useState(INIT_PROFILE)

	const [feed, setFeed] = useState(profile.posts)

	const fullName = profile.name.firstName + " " + profile.name.lastName
	
	const createPost = (post) => {
		setFeed((prevState) => ([
			post,
			...prevState,
		]))
	}

	const updateProfile = (user) => {
		setProfile((prevState) => ({
			...prevState,
			...user,
		}))
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await axios.get(`/api/users/${username}`)
				setProfile(prevState => ({
					...prevState,
					...data.user,
				}))
				setFeed(data.user.posts)
				setIsLoading(false)
			}catch(error){
				setMessage({
	        title: "Error",
	        description: error.response.data.message,
	        status: "error",
	        duration: 2000,
	        isClosable: true,
	      })
			}
 		}
 		fetchData()
	}, [username])

	return (
		<div>
			<Toast message={message} />
			<SectionHeader title="Profile" icon={BiFace} hasBackButton={true} />
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
        :
        	<Box mx={{base: "0", sm: "4"}} mb={{base: "24", md: "2"}} shadow="sm" bg="white" rounded="lg">
						<Flex justify="flex-end">
							<IconButton onClick={onOpen} variant="ghost" icon={BiEdit} size="lg" m="2"/>
						</Flex>
						<Flex pb="4" borderBottom="4px" borderColor="gray.200" mb="4" flexDirection="column" justify="center" align="center">
							{/* Avatar */}
							<Avatar size="2xl" src={profile.photo} name={fullName} mb="2"/>
							{/* Name */}
							<Text fontSize="2xl" fontWeight="semibold">{fullName}</Text>
							{/* Username */}
							<Text fontWeight="light">@{profile.username}</Text>

							{/* Bio */}
							<Flex px="8" py="4" justify="center" >
								<Text textAlign="center">{profile.bio}</Text>
							</Flex>
							<Flex flexDirection="column" mt="2">
								{/* Location */}
								<Flex align="center" justify="center">
									<Box as={BiCompass} color="primary.600" size="6" />
									<Text ml="2">{profile.location || "---"}</Text>
								</Flex>
								{/* Email */}
								<Flex align="center" justify="center">
									<Box as={BiEnvelope} color="primary.600" size="6" />
									<Text ml="2">{profile.email || "---"}</Text>
								</Flex>
								{/* Contact */}
								<Flex align="center" justify="center">
									<Box as={BiPhone} color="primary.600" size="6" />
									<Text ml="2">{profile.contactNumber || "---"}</Text> 
								</Flex>
							</Flex>
							<StatGroup >
								{/* Donations */}
							  <Stat d="flex" p="4" flexDirection="column" justifyContent="center" alignItems="center">
							    <StatNumber>{profile.donationGiven}</StatNumber>
							    <StatLabel color="primary.600">Donations</StatLabel>
							  </Stat>
							  {/* Requests */}
							  <Stat d="flex" p="4" flexDirection="column" justifyContent="center" alignItems="center">
							    <StatNumber>{profile.donationRequested}</StatNumber>
							    <StatLabel color="primary.600" >Requests</StatLabel>
							  </Stat>
							</StatGroup>
						</Flex>
						<Feed 
							posts={feed}
			      	createPost={createPost}
						/>
					</Box>
			}

			{/* Edit Form Modal */}
			<Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Edit Profile Form */}
            <EditProfileFormContainer onClose={onClose} handleIsSubmitting={setIsSubmitting} profile={profile} updateProfile={updateProfile} />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variantColor="cyan" type="submit" isLoading={isSubmitting} form="editProfileForm">Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
			
		</div>
	)
}

export default Profile