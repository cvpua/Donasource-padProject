import React,{ useContext } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl.js'
import axios from 'axios'
import { UserContext } from '../App.js'

const ChangePasswordFormContainer = (props) => {
	const { onClose, handleIsSubmitting, addComment, postId } = props

	const [USER] = useContext(UserContext)
	const { user } = USER
	const { _id: userId } = user

	const initialValues = {
		userId: userId,
		oldPassword: '',
		newPassword: '',
		newPasswordCopy: '',
	}

	const validationSchema = Yup.object().shape({
		oldPassword: Yup.string().required('Required'),
		newPassword: Yup.string().required('Required'),
		newPasswordCopy: Yup.string().oneOf([Yup.ref('newPassword')],'Password does not match').required('Required'),
	})

	const onSubmit = async (values) => {
		handleIsSubmitting(true)
		try {
			const { data } = await axios.patch(`/api/user/${userId}/changePassword`, values)
			alert(data.message)
			handleIsSubmitting(false)
			onClose()
		}catch (error){
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
							<Form id="changePasswordForm">
								<FormikControl control="password" label="Old Password" name="oldPassword" />
								<FormikControl control="password" label="New Password" name="newPassword" />
								<FormikControl control="password" name="newPasswordCopy" placeholder="Enter your new password again" />
							</Form>
						</div>
					)
				}
			}
		</Formik>
	)
}

export default ChangePasswordFormContainer