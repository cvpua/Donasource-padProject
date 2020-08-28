import React from 'react'
import { Skeleton, Box, Flex, Stat, StatGroup } from '@chakra-ui/core'

const ProfileSkeleton = () => {
	return (
		<Box mx="4" shadow="sm" bg="white" rounded="lg">
			<Flex pt="16" pb="4" mb="4" flexDirection="column" justify="center" align="center">
				{/* Avatar */}
				<Skeleton h="32" w="32" rounded="full" mb="2" />
				{/* Name */}
				<Skeleton h="8" w="64" my="1"/>
				{/* Username */}
				<Skeleton h="4" w="40" my="1"/>

				<Flex flexDirection="column" mt="4">
					{/* Location */}
					<Flex align="center" justify="center">
						<Skeleton h="4" w="40" my="1"/>
					</Flex>
					{/* Email */}
					<Flex align="center" justify="center">
						<Skeleton h="4" w="32" my="1"/>
					</Flex>
					{/* Contact */}
					<Flex align="center" justify="center">
						<Skeleton h="4" w="40" my="1"/>
					</Flex>
				</Flex>

				<StatGroup >
					{/* Donations */}
				  <Stat d="flex" p="4" flexDirection="column" justifyContent="center" alignItems="center">
				    <Skeleton h="12" w="12" my="1"/>
				    <Skeleton h="4" w="12" my="1"/>
				  </Stat>
				  {/* Requests */}
				  <Stat d="flex" p="4" flexDirection="column" justifyContent="center" alignItems="center">
				    <Skeleton h="12" w="12" my="1"/>
				    <Skeleton h="4" w="12" my="1"/>
				  </Stat>
				</StatGroup>
			</Flex>
		</Box>
	)
}

export default ProfileSkeleton