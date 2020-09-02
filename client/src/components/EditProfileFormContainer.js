import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl.js'
import axios from 'axios'

const EditProfileFormContainer = (props) => {
	const { onClose, handleIsSubmitting, profile, updateProfile } = props
	const {
		_id: userId,
		username,
		name,
		location,
		email,
		contactNumber,
		bio,
	} = profile

	const initialValues = {
		username: username,
		name: {
			firstName: name.firstName,
			lastName: name.lastName,
		},
		location: location || "",
		email: email,
		contactNumber: contactNumber,
		bio: bio || "",
	}

	const validationSchema = Yup.object().shape({
		username: Yup.string().required('Required'),
		name: Yup.object().shape({
			firstName: Yup.string().required('Required'),
			lastName: Yup.string().required('Required'),
		}).required('Required'),
		location: Yup.string(),
		email: Yup.string().email('Invalid email').required('Required'),
		contactNumber: Yup.string().matches(/^(09|\+639)\d{9}$/, 'Enter valid phone number').required('Required'),
		bio: Yup.string()
	})

	const onSubmit = async (values) => {
		handleIsSubmitting(true)
		try{
			const { data } = await axios.patch(`/api/user/${userId}/editUser`, values)
			updateProfile(data.user)
			handleIsSubmitting(false)
			onClose()
		}catch(error){
			alert(error.message)
		}
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
								<FormikControl control="input" label="First Name" name="name.firstName" />
								<FormikControl control="input" label="Last Name" name="name.lastName" />
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