import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl.js'

const LoginFormContainer = (props) => {
	const { handleIsSubmitting, login } = props

	const initialValues = {
		email: '',
		password: '',
	}

	const validationSchema = Yup.object().shape({
		email: Yup.string().email('Invalid email').required('Required'),
		password: Yup.string().required('Required')
	})

	const onSubmit = (values) => {
		handleIsSubmitting(true)
		login()
		console.log('Values: ', values)
		handleIsSubmitting(false)
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
		>
			{
				(formikProps) => {
					return (<div>
							<Form id="loginform">
								<FormikControl control="input" type="email" label="Email" name="email" placeholder="Enter email" />
								<FormikControl control="password" label="Password" name="password" />
							</Form>
						</div>
					)
				}
			}
		</Formik>
	)
}

export default LoginFormContainer