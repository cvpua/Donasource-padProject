import React from 'react'
import { Field } from 'formik'
import { Input, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/core'
import DatePicker from 'react-datepicker'

const MyDate = (props) => {
	const { label, name, ...rest } =props
	return (
		<Field name={name}>
			{
				({field, form}) => {
					return <FormControl isInvalid={form.errors[name] && form.touched[name]} mb="2">
						<FormLabel htmlFor={name}>{label}</FormLabel>
						<br />
						<DatePicker
							{...field}
							{...rest}
							id={name}
							selected={form.values[name]}
							onChange={date => form.setFieldValue(name, date)}
							showTimeSelect
							dateFormat="MM/dd/yyyy h:mm aa"
							customInput={<Input />}
						/>
						<FormErrorMessage>{form.errors[name]}</FormErrorMessage>
					</FormControl>
				}
			}
		</Field>
	)
}

export default MyDate