import React from 'react'
import { Field, FieldArray } from 'formik'
import { Input, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/core'

const MyTags = (props) => {
	const { label, name, ...rest } =props
	return (
		<>
		<FormLabel htmlFor={name}>{label}</FormLabel>
		<FieldArray name={name}>
			{
				(fieldArrayProps) => {
					const {push, remove, form} = fieldArrayProps
					const {values} = form
					const {tags} = values
					return (
						<div>
							{
								tags.map((item,index) => (
									<div key={index}>
									{
										index > 0 && (
											<button type='button' onClick={() => remove(index)} >
											-
											</button>
										)
									}
									{/* Item Name Field */}
									<Field name={`${name}[${index}]`}>
										{
											({field,form}) => (
												<FormControl ml="2" isInvalid={
														form.errors[name] && 
														form.touched[name] && 
														form.errors[name][index] &&
														form.touched[name][index]
													} 
												>
													<Input id={`${name}[${index}]`} {...rest} {...field} />
													<FormErrorMessage>{
														form.errors[name] && 
														form.errors[name][index]
													} </FormErrorMessage>
												</FormControl>
											)
										}
									</Field>
									</div>
								))
							}
							<button type='button' onClick={() => push('')} >+</button>
						</div>
					)
				}
			}
		</FieldArray>
		</>
	)
}

export default MyTags