import React from 'react'
import { Field, FieldArray } from 'formik'
import {  
	NumberInput,
	Input, 
	FormControl, 
	FormLabel, 
	FormErrorMessage,
	Button,
	Box,
	Flex,
} from '@chakra-ui/core'

const MyItems = (props) => {
	const { label, name, ...rest } =props
	return (
		<>
		<FormLabel htmlFor={name}>{label}</FormLabel>
		<FieldArray name={name}>
			{
				(fieldArrayProps) => {
					const {push, remove, form} = fieldArrayProps
					const {values} = form
					const {items} = values
					return (
						<div>
							{
								items.map((item,index) => (
									<Box key={index} bg="cyan.100" p="4" rounded="lg" mb="2">
									{/* Item Name Field */}
									<Field name={`${name}[${index}].name`}>
										{
											({field,form}) => (
												<FormControl isInvalid={
														form.errors[name] && 
														form.touched[name] && 
														form.errors[name][index] &&
														form.touched[name][index] &&
														form.errors[name][index].name && 
														form.touched[name][index].name
													} 
												>
													<FormLabel htmlFor={`${name}.${index}.name`}>Item Name</FormLabel>
													<Input id={`${name}.${index}.name`} {...rest} {...field} />
													<FormErrorMessage>{
														form.errors[name] && 
														form.errors[name][index] &&
														form.errors[name][index].name
													} </FormErrorMessage>
												</FormControl>
											)
										}
									</Field>
									{/* Item Quantity Field */}
									<Field name={`${name}[${index}].total`}>
										{
											({field,form}) => (
												<FormControl isInvalid={
														form.errors[name] && 
														form.touched[name] && 
														form.errors[name][index] &&
														form.touched[name][index] &&
														form.errors[name][index].quantity && 
														form.touched[name][index].quantity
													} >
													<FormLabel htmlFor={`${name}.${index}.total`}>Quantity</FormLabel>
													<NumberInput 
														id={`${name}.${index}.total`} 
														type="number" 
														{...rest}
														{...field} 
														onChange={val=>form.setFieldValue(`${name}.${index}.total`, val)}
														onBlur={(e) => {form.setFieldTouched(`${name}.${index}.total`,true)}}  
													/>
													<FormErrorMessage>{
														form.errors[name] && 
														form.errors[name][index] &&
														form.errors[name][index].quantity
													} </FormErrorMessage>
												</FormControl>
											)
										}
									</Field>
									{
										index > 0 && (
											<Flex justify="flex-end" mt="2">
												<Button size="sm" variantColor="red" leftIcon="minus" onClick={() => remove(index)}>Remove Item</Button>
											</Flex>
										)
									}
									</Box>
								))
							}
							<Button size="sm" my="2" mr="2" leftIcon="add" onClick={() => push({name: '', total: '', amount: 0})}>Add Item</Button>
						</div>
					)
				}
			}
		</FieldArray>
		</>
	)
}

export default MyItems