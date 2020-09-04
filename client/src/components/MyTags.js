import React from 'react'
import { Field, FieldArray } from 'formik'
import { Input, FormControl, FormLabel, FormErrorMessage, Flex, Button } from '@chakra-ui/core'

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
									{/* Item Name Field */}
									<Field name={`${name}[${index}]`}>
										{
											({field,form}) => (
												<FormControl mt="2" ml="2" isInvalid={
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
									{
										index > 0 && (
											<Flex justify="flex-end" mt="2">
												<Button size="sm" variantColor="red" leftIcon="minus" onClick={() => remove(index)}>Remove Tag</Button>
											</Flex>
										)
									}
									</div>
								))
							}
							<Button size="sm" my="2" mr="2" leftIcon="add" onClick={() => push('')}>Add Tag</Button>
						</div>
					)
				}
			}
		</FieldArray>
		</>
	)
}

export default MyTags