import React from 'react'
import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/core'

const MyImages = (props) => {
	const { label, name, form, ...rest } = props
	const { setFieldValue } = form

	return (
 					<FormControl isInvalid={form.errors[name] && form.touched[name]} >
						<FormLabel htmlFor={name}>{label}</FormLabel>
						<input id={name} onChange={(event) => {setFieldValue("images", event.currentTarget.files)}} {...rest} />
						<FormErrorMessage>{form.errors[name]}</FormErrorMessage>
					</FormControl>
	)
}

export default MyImages