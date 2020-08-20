import React from 'react'
import { Field } from 'formik'
import { NumberInput, NumberInputField, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/core'

const MyNumeric = (props) => {
	const { label, name, ...rest } = props

	return (
		<Field name={name}>
			{
				({field,form}) => (
					<FormControl isInvalid={form.errors[name] && form.touched[name]} mb="4">
						<FormLabel htmlFor={name}>{label}</FormLabel>
						<NumberInput 
							id={name}
							onChange={val=>form.setFieldValue(name, val)} 
							min={0}
							{...rest} {...field}
						>
							<NumberInputField />
						</NumberInput>
						<FormErrorMessage>{form.errors[name]}</FormErrorMessage>
					</FormControl>
				)
			}
		</Field>
	)
}

export default MyNumeric