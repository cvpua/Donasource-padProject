import React, {useState, useEffect, useContext} from 'react'
import { Box, Flex, Avatar, Text, Divider, Badge } from '@chakra-ui/core'
import { BiBell } from 'react-icons/bi'
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
				const notifications = [
					{
						label: "Today",
						contents: [],
					},
					{
						label: "Yesterday",
						contents: [],
					},
				]
				const currentDate = new Date()
				const currentDay = Math.floor(currentDate.getTime() / (1000 * 3600 * 24))

				let index = 1
				let prevDay = currentDay

				data.notifications.forEach((item) => {
					const notifDay = Math.floor(item.date.getTime() / (1000 * 3600 * 24))
					const label = `${monthNames[currentDate.getMonth()]} ${currentDate.getDate()}`

					if (notifDay === currentDay) {
						notifications[0].contents.push(item)
					}
					else if (notifDay === currentDay - 1) {
						notifications[1].contents.push(item)
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
			}catch(error){
				alert(error.message)
			}
		}
		fetchData()
	}, [])

	return (
		<React.Fragment>
			<SectionHeader title="Notification" icon={BiBell} />
			<Box mx="4" rounded="lg" bg="white" shadow="sm" pb="2">
				{
					notifications.map((notification) => {
						return(<React.Fragment>
							<Text ml="6" fontSize="sm" fontWeight="semibold" pt="4" pb="2" color="gray.800">{notification.label}</Text>
							<Divider />
							{
								notification.contents.map((notif) => {
									return(<Notification notif={notif} seenNotif={seenNotif} />)
								})
							}
						</React.Fragment>)
					})
				}
		</Box>
		</React.Fragment>
	)
}

export default NotificationSection