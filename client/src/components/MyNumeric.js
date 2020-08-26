import React from 'react'
import { Field } from 'formik'
import { NumberInput,  NumberInputField, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/core'

const MyNumeric = (props) => {
	const { label, name, index, amount, donorLength, ...rest } = props

	return (
		<Field name={`${name}[${index}].donor[${donorLength - 1}].amountDonated`}>
			{
				({field,form}) => {
					console.log('Form Values: ', form.values)
					return(
					<FormControl
						isInvalid={
							form.errors[name] && 
							form.touched[name] && 
							form.errors[name][index] && 
							form.touched[name][index] &&
							((
								form.errors[name][index].donor &&
								form.touched[name][index].donor &&
								form.errors[name][index].donor[donorLength-1].amountDonated && 
								form.touched[name][index].donor[donorLength-1].amountDonated
							) ||
							(
								form.errors[name][index].amount && 
								form.touched[name][index].donor[donorLength-1].amountDonated
							))
						}  
						mb="4"
					>
						<FormLabel htmlFor={`${name}[${index}].donor[${donorLength-1}].amountDonated`}>{label}</FormLabel>
						<NumberInput 
							id={`${name}[${index}].donor[donor.length - 1].amountDonated`} 
							{...rest} 
							{...field} 
							onChange={ (val) => {
								form.setFieldValue(`${name}[${index}].amount`, val + amount)
								form.setFieldValue(`${name}[${index}].donor[${donorLength-1}].amountDonated`, val)
							}} 
							onBlur={ (e) => {form.setFieldTouched(`${name}[${index}].donor[${donorLength-1}].amountDonated`,true)}} />
						<FormErrorMessage>
							{
								form.errors[name] && 
								form.errors[name][index] &&
								((
									form.errors[name][index].donor &&
									form.errors[name][index].donor[donorLength-1].amountDonated
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

export default MyNumeric