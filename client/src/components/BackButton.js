import React from 'react'
import { useHistory } from 'react-router-dom'
import { IconButton, Box } from '@chakra-ui/core'
import { BiArrowBack } from 'react-icons/bi'

const BackButton = () => {
	const history = useHistory()

	const ArrowBack = () => {
		return (
			<Box as={BiArrowBack} size="6" />
		)
	}

	return (
		<IconButton variant="ghost" variantColor="cyan" icon={ArrowBack} onClick={() => history.goBack()} mr="2" />
	)
}

export default BackButton