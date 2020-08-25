import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl.js'

const EditProfileFormContainer = (props) => {
	const { onClose, handleIsSubmitting } = props

	const initialValues = {
		
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
								
							</Form>
						</div>
					)
				}
			}
		</Formik>
	)
}

export default EditProfileFormContainer