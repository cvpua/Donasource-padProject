import React from 'react'
import { Field } from 'formik'
import { NumericInput, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/core'

const MyInput = (props) => {
	const { label, name, ...rest } =props
	return (
		<Field name={name}>
			{
				({field, form}) => {
					return <FormControl isInvalid={form.errors[name] && form.touched[name]} >
						<FormLabel htmlFor={name}>{label}</FormLabel>
						<NumericInput id={name} {...rest} {...field} />
						<FormErrorMessage>{form.errors[name]}</FormErrorMessage>
					</FormControl>
				}
			}
		</Field>
	)
}

export default MyInput