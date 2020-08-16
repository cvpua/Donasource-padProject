import React from 'react'
import {Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'
import * as yup from 'yup';

const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

const initialValues = {
	name: '',
	email: '',
	channel: '',
	comments: '',
	phNumbers: [''],
}

const onSubmit = (values) => {
	console.log('Form Data: ', values)
}

const validate = (values) => {
	let errors = {}

	if(!values.name){
		errors.name = 'Required'
	}

	if(!values.email){
		errors.email = 'Required'
	}else if(!re.test(values.email)){
		errors.email = 'Enter a valid email'
	}

	if(!values.channel){
		errors.channel = 'Required'
	}

	return errors
}

const PostForm = () => {
	// Managing the form state
	// Handling form submission
	// Validation and error messages

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validate={validate}
		>
			<Form>
				<div>
					<label htlmlfor='name'>Name</label>
					<Field type='text' id='name' name='name' />
					<ErrorMessage name='name' />
				</div>

				<div>
					<label htlmlfor='email'>E-mail</label>
					<Field type='email' id='email' name='email' />
					<ErrorMessage name='email' />
				</div>

				<div>
					<label htlmlfor='channel'>Channel</label>
					<Field type='text' id='channel' name='channel' />
					<ErrorMessage name='channel' />
				</div>

				<div>
					<label htlmlfor='comments'>Comments</label>
					<Field as='textarea' id='comments' name='comments' />
					<ErrorMessage name='comments' />
				</div>

				<div>
					<label>List of Phone Numbers</label>
					<FieldArray name='phNumbers'>
						{
							(fieldArrayProps) => {
								const {push, remove, form} = fieldArrayProps
								const {values} = form
								const {phNumbers} = values
								return (
									<div>
										{phNumbers.map((phNumber,index) => (
											<div key={index}>
												<Field name={`phNumbers[${index}]`} />
												{
													index > 0 && (
														<button type='button' onClick={() => remove(index)} >
														-
														</button>
													)
												}
												<button type='button' onClick={() => push('')} >+</button>
											</div>
										))}
									</div>
								)
							}
						}
					</FieldArray>
				</div>

				<button type='submit'>Submit</button>
			</Form>
		</Formik>
	)
}

export default PostForm