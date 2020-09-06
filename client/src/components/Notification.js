import React from 'react'
import { Box, Flex, Avatar, Text, Divider } from '@chakra-ui/core'
import { Link } from 'react-router-dom'

const Notification = ({notif, seenNotif}) => {
	const {
		_id: notifId,
		user,
		type,
		postId,
		date,
		title,
		seen,
	} = notif

	const { avatar, name, username } = user

	const fullName = name.firstName + " " + name.lastName
	const currentDate = new Date()
	const notifDate = new Date(date)
 	const time = currentDate.getTime() - notifDate.getTime()

 	const days = Math.floor(time / (1000 * 3600 * 24))
  const hours = Math.floor(time / (1000 * 3600))
  const mins = Math.floor(time / (1000 * 60))
  const sec = Math.floor(time / (1000))

	return (
		<React.Fragment>
				<Flex 
					pos="relative"
					pl="4" 
					py="4" 
					align="center" 
					bg={
						type === "like" && !seen ? "cyan.100"
						: type === "comment" && !seen ? "blue.100"
						: type === "donate" && !seen ? "yellow.100"
						: type === "accept" && !seen ? "green.100"
						: type === "reject" && !seen ? "red.100"
						: "none"
					} 
					mx="4" 
					rounded="lg"
				>
					<Box 
						as={Link} 
						to={`/${username}/post/${postId}`} 
						w="full" 
						h="full" 
						pos="absolute" 
						top="0" 
						left="0" 
						bottom="0" 
						right="0"
						onClick={() => seenNotif(notifId)}
					>
					</Box>
					{/* Avatar */}
					<Link to={`/${username}`}>
						<Avatar name="Bullet Pua" src={avatar && avatar.url} />
					</Link>
					<Box ml="4">
						{/* Response */}
						<Text>
							<b>{fullName + " "}</b>
							{
								type === "like" ? "liked your posts: "
								: type === "comment" ? "commented on your post: "
								: type === "donate" ? "donated on your post: "
								: type === "accept" ? "accepted your request on post: "
								: type === "reject" ? "rejected your request on post: "
								: ""
							}
							<b>"{title}"</b>
						</Text>
						{/* time */}
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
			<Divider />
		</React.Fragment>
	)
}

export default Notification