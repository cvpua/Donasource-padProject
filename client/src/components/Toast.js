import React,{ useEffect } from 'react'
import { useToast } from '@chakra-ui/core'

const Toast = (props) => {
	const { message } = props
	const toast = useToast()

	useEffect(() => {
		if (message) {
			toast(message)
		}
	}, [toast, message])

	return (
		<React.Fragment></React.Fragment>
	)
}

export default Toast