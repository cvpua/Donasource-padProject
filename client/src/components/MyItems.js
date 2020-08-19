import React from 'react'
import { Field, ErrorMessage, FieldArray } from 'formik'
import {  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,Input, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/core'

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
									<div key={index}>
									{
										index > 0 && (
											<button type='button' onClick={() => remove(index)} >
											-
											</button>
										)
									}
									{/* Item Name Field */}
									<Field name={`${name}[${index}].name`}>
										{
											({field,form}) => (
												<FormControl ml="2" isInvalid={
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
												<FormControl ml="2" isInvalid={
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
														type="number" {...rest} 
														onChange={val=>form.setFieldValue(`${name}.${index}.total`, val)} 
													>
														<NumberInputField />
													  <NumberInputStepper>
													    <NumberIncrementStepper />
													    <NumberDecrementStepper />
													  </NumberInputStepper>
													</NumberInput>
													<FormErrorMessage>{
														form.errors[name] && 
														form.errors[name][index] &&
														form.errors[name][index].quantity
													} </FormErrorMessage>
												</FormControl>
											)
										}
									</Field>
									</div>
								))
							}
							<button type='button' onClick={() => push({name: '', total: '', amount: 0})} >+</button>
						</div>
					)
				}
			}
		</FieldArray>
		</>
	)
}

export default MyItems