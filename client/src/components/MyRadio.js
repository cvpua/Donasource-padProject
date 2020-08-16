import React from 'react'
import { Field, ErrorMessage} from 'formik'
import { Radio, RadioGroup, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/core'

const MyRadio = (props) => {
	const { label, name, ...rest } =props
	return (
		<Field name={name}>
			{
				({field, form}) => (
					<FormControl isInvalid={form.errors[name] && form.touched[name]} >
						<FormLabel htmlFor={name}>{label}</FormLabel>
						<RadioGroup id={name} isInline {...rest} {...field} >
							<Radio value="donation">Donation</Radio>
							<Radio value="request">Request</Radio>
						</RadioGroup>
						<FormErrorMessage>{form.errors[name]}</FormErrorMessage>
					</FormControl>
				)
			}
		</Field>
	)
}

export default MyRadio