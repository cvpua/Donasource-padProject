import React, {useState, useEffect, useContext} from 'react'
import { Box, Flex, Avatar, Text, Divider, Badge, Spinner } from '@chakra-ui/core'
import { BiBell, BiBellOff } from 'react-icons/bi'
import SectionHeader from './SectionHeader.js'
import Notification from './Notification.js'
import axios from 'axios'
import {UserContext} from '../App.js'

// Like Notif: User liked your post
// Comment Notif: User commented on your post
// Donate Notif: User donated on your post -> user can see who donated on their post
// Accepted Request Notif: User accepted you request in his post
// Rejected Request Notif: User rejected your request in his post

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const INIT_NOTIF = [
	{
		type: "like",
		name: {
			firstName: "Marco",
			lastName: "Mirandilla"
		},
		postId: "12345",
		date: new Date(),
		avatar: null,
		title: "Penge Ayuda",
	},
	{
		type: "comment",
		name: {
			firstName: "Marco",
			lastName: "Mirandilla"
		},
		postId: "12345",
		date: new Date(),
		avatar: null,
		title: "Penge Ayuda",
	},
	{
		type: "reject",
		name: {
			firstName: "Marco",
			lastName: "Mirandilla"
		},
		postId: "12345",
		date: new Date(),
		avatar: null,
		title: "Penge Ayuda",
	},
]

const NotificationSection = () => {
	const [USER] = useContext(UserContext)
	const { user } = USER
	const { _id: userId } = user

	const [notifications, setNotifications] = useState([])

	const [isLoading, setIsLoading] = useState(true)

	const seenNotif = async (notifId) => {
		try{
			const { data } = await axios.patch(`/api/users/${userId}/notifications/${notifId}`)
		}catch(error){
			alert(error.message)
		}
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await axios.get(`/api/users/${userId}/notifications`)
				const notifications = []
				const currentDate = new Date()
				const currentDay = Math.floor(currentDate.getTime() / (1000 * 3600 * 24))

				let index = 0
				let prevDay = currentDay

				data.notifications.forEach((item) => {
					const itemDate = new Date(item.date)
					const notifDay = Math.floor(itemDate.getTime() / (1000 * 3600 * 24))
					const label = `${monthNames[currentDate.getMonth()]} ${currentDate.getDate()}`

					if (notifDay === currentDay && notifications.length === 0) {
						notifications.push({
							label: "Today",
							contents: [item]
						})
					}
					else if (notifDay === currentDay - 1 && notifications.length === 1) {
						notifications.push({
							label: "Yesterday",
							contents: [item]
						})
						prevDay = notifDay
						index = index + 1
					}
					else if (prevDay !== notifDay){
						notifications.push(
							{
								label: label,
								contents: [item]
							}
						)
						index = index + 1
						prevDay = notifDay
					}
					else {
						notifications[index].contents.push(item)
					}
				})
				setNotifications(notifications)
				setIsLoading(false)
			}catch(error){
				alert(error.message)
			}
		}
		fetchData()
	}, [])

	return (
		<React.Fragment>
			<SectionHeader title="Notification" icon={BiBell} />
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
				: notifications.length === 0 ? 
					<Flex align="center" py="8" flexDirection="column">
            <Box as={BiBellOff} size="20" />
            <Text fontWeight="bold" fontSize="lg">No notifications yet</Text>
            <Text>Stay tuned! Notifications about your activity will show up here.</Text>
          </Flex>
        :
					<Box mx="4" rounded="lg" bg="white" shadow="sm" pb="2">
						{
							notifications.map((notification) => {
								return(<React.Fragment>
									<Text ml="6" fontSize="sm" fontWeight="semibold" pt="4" pb="2" color="gray.800">{notification.label}</Text>
									<Divider />
									{
										notification.contents.map((notif) => {
											return(<Notification key={notif._id} notif={notif} seenNotif={seenNotif} />)
										})
									}
								</React.Fragment>)
							})
						}
					</Box>
			}
		</React.Fragment>
	)
}

export default NotificationSection