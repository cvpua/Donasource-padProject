import React from 'react'
import { Field } from 'formik'
import { NumberInput, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/core'

const MyNumeric = (props) => {
	const { label, name, index, amount, ...rest } = props

	return (
		<Field name={`${name}[${index}].donor.amountDonated`}>
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
								form.errors[name][index].donor &&
								form.touched[name][index].donor &&
								form.errors[name][index].donor.amountDonated && 
								form.touched[name][index].donor.amountDonated
							) ||
							(
								form.errors[name][index].amount && 
								form.touched[name][index].donor.amountDonated
							))
						}  
						mb="4"
					>
						<FormLabel htmlFor={`${name}[${index}].donor.amountDonated`}>{label}</FormLabel>
						<NumberInput 
							id={`${name}[${index}].donor.amountDonated`} 
							{...rest} 
							{...field} 
							onChange={ (val) => {
								form.setFieldValue(`${name}[${index}].amount`, val + amount)
								form.setFieldValue(`${name}[${index}].donor.amountDonated`, val)
								form.setFieldValue('totalDonation', form.values.totalDonation + val)
							}} 
							onBlur={ (e) => {form.setFieldTouched(`${name}[${index}].donor.amountDonated`,true)}} />
						<FormErrorMessage>
							{
								form.errors[name] && 
								form.errors[name][index] &&
								((
									form.errors[name][index].donor &&
									form.errors[name][index].donor.amountDonated
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