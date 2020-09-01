import React from 'react'
import { Box, Flex, Avatar, Text, Divider } from '@chakra-ui/core'
import { Link } from 'react-router-dom'

const Notification = ({notif, seenNotif}) => {
	const {
		notifId,
		type,
		name,
		postId,
		date,
		avatar,
		title,
		seen,
	} = notif

	const fullName = name.firstName + " " + name.lastName
	const currentDate = new Date()
 	const time = currentDate.getTime() - date.getTime()

 	const days = Math.floor(time / (1000 * 3600 * 24))
  const hours = Math.floor(time / (1000 * 3600))
  const mins = Math.floor(time / (1000 * 60))
  const sec = Math.floor(time / (1000))

	return (
		<React.Fragment>
			<Link to={`/profile/post/${postId}`} onClick={() => seenNotif(notifId)} >
				<Flex 
					pl="4" 
					py="4" 
					align="center" 
					bg={
						type === "like" && !seen ? "cyan.200"
						: type === "comment" && !seen ? "blue.200"
						: type === "donate" && !seen ? "yellow.200"
						: type === "accept" && !seen ? "green.200"
						: type === "reject" && !seen ? "red.200"
						: "none"
					} 
					mx="4" 
					rounded="lg"
				>
					{/* Avatar */}
					<Avatar name="Bullet Pua" src={avatar} />
					<Box ml="4">
						{/* Response */}
						<Text>
							<b>{fullName + " "}</b>
							{
								type === "like" ? "liked your posts: "
								: type === "comment" ? "commented on your post: "
								: type === "donate" ? "donated on your post: "
								: type === "accept" ? "accepted your request on post: "
								: type === "reject" ? "reject your request on post: "
								: ""
							}
							<b>"{title}"</b>
						</Text>
						{/* time */}
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
			</Link>
			<Divider />
		</React.Fragment>
	)
}

export default Notification