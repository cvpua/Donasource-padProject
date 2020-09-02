import React from 'react'
import { Field } from 'formik'
import { NumberInput,  NumberInputField, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/core'

const MyRequest = (props) => {
	const { label, name, index, amount, ...rest } = props

	return (
		<Field name={`${name}[${index}].amountRequested`}>
			{
				({field,form}) => {
					return(
					<FormControl
						isInvalid={
							form.errors[name] && 
							form.touched[name] && 
							form.errors[name][index] && 
							form.touched[name][index] &&
							((
								form.errors[name][index].amountRequested && 
								form.touched[name][index].amountRequested
							) ||
							(
								form.errors[name][index].amount && 
								form.touched[name][index].amountRequested
							))
						}  
						mb="4"
					>
						<FormLabel htmlFor={`${name}[${index}].amountRequested`}>{label}</FormLabel>
						<NumberInput 
							id={`${name}[${index}].amountRequested`} 
							{...rest} 
							{...field} 
							onChange={ (val) => {
								form.setFieldValue(`${name}[${index}].amount`, val + amount)
								form.setFieldValue(`${name}[${index}].amountRequested`, val)
								form.setFieldValue('totalRequest', form.values.totalRequest + val)
							}} 
							onBlur={ (e) => {form.setFieldTouched(`${name}[${index}].amountRequested`,true)}} />
						<FormErrorMessage>
							{
								form.errors[name] && 
								form.errors[name][index] &&
								((
									form.errors[name][index].donor &&
									form.errors[name][index].amountRequested
								) ||
								form.errors[name][index].amount)
							} 
						</FormErrorMessage>
					</FormControl>
					)
				}
			}
		</Field>
	)
}

export default MyRequest