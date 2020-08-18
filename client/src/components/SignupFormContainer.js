import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl.js'

const SignupFormContainer = (props) => {
	const { handleIsSubmitting } = props

	const initialValues = {
    username : "",
    firstName: "",
    lastName: "",
    email: "",
    contactNumber : '',
    password: "",
    repassword: "",
	}

	const validationSchema = Yup.object().shape({
		username: Yup.string().required('Required'),
		firstName: Yup.string().required('Required'),
		lastName: Yup.string().required('Required'),
		email: Yup.string().email('Invalid email').required('Required'),
		contactNumber: Yup.string().matches(/^(09|\+639)\d{9}$/, 'Enter valid phone number').required('Required'),
		password: Yup.string().required('Required'),
		repassword: Yup.string().oneOf([Yup.ref('password')],'Password does not match').required('Required')
	})

	const onSubmit = async (values) => {
		handleIsSubmitting(true)
		setTimeout(() => {
			console.log('Values: ', values)
			handleIsSubmitting(false)
		}, 3000)
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
							<Form id="signupform">
								<FormikControl control="input" label="Username" name="username" />
								<FormikControl control="input" label="First Name" name="firstName" />
								<FormikControl control="input" label="Last Name" name="lastName" />
								<FormikControl control="input" type="email" label="Email" name="email" placeholder="Enter email" />
								<FormikControl control="input" type="tel" label="Contact number" name="contactNumber" />
								<FormikControl control="password" label="Password" name="password" />
								<FormikControl control="password" name="repassword"  placeholder="Enter password again" />
							</Form>
						</div>
					)
				}
			}
		</Formik>
	)
}

export default SignupFormContainer