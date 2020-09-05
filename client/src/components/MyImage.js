import React from 'react'
import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/core'

const MyImage = (props) => {
	const { label, name, form, ...rest } = props
	const { setFieldValue } = form

	return (
 					<FormControl isInvalid={form.errors[name] && form.touched[name]} >
						<FormLabel htmlFor={name}>{label}</FormLabel>
						<input id={name} onChange={(event) => {setFieldValue(name, event.currentTarget.files[0])}} {...rest} />
						<FormErrorMessage>{form.errors[name]}</FormErrorMessage>
					</FormControl>
	)
}

export default MyImage