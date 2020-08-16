import React from 'react'
import { Field } from 'formik'
import { Input, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/core'
import Thumb from './Thumb.js'

const MyImages = (props) => {
	const { label, name, form, ...rest } = props
	const { values, setFieldValue } = form

	return (
 					<FormControl isInvalid={form.errors[name] && form.touched[name]} >
						<FormLabel htmlFor={name}>{label}</FormLabel>
						<input id={name} onChange={(event) => {setFieldValue("images", event.currentTarget.files)}} {...rest} />
						<FormErrorMessage>{form.errors[name]}</FormErrorMessage>
					</FormControl>
	)
}

export default MyImages