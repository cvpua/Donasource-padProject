import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl.js'

const EditProfileFormContainer = (props) => {
	const { onClose, handleIsSubmitting, profile } = props
	const {
		username,
		name,
		location,
		email,
		contactNumber,
		bio,
	} = profile

	const initialValues = {
		username: username,
		firstName: name.firstName,
		lastName: name.lastName,
		location: location,
		email: email,
		contactNumber: contactNumber,
		bio: bio,
	}

	const validationSchema = Yup.object().shape({
		
	})

	const onSubmit = async (values) => {
		
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
							<Form id="editProfileForm">
								<FormikControl control="input" label="Username" name="username" />
								<FormikControl control="input" label="First Name" name="firstName" />
								<FormikControl control="input" label="Last Name" name="lastName" />
								<FormikControl control="input" label="Location" name="location" />
								<FormikControl control="input" label="Email" name="email" />
								<FormikControl control="input" type="tel" label="Contact number" name="contactNumber" />
								<FormikControl control="textarea" label="Bio" name="bio" />
							</Form>
						</div>
					)
				}
			}
		</Formik>
	)
}

export default EditProfileFormContainer