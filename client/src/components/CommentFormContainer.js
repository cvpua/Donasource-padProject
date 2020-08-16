import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl.js'
import axios from 'axios'
import JeffPic from '../assets/Jeff.jpg'

const CommentFormContainer = (props) => {
	const { onClose, handleIsSubmitting, addComment } = props

	const initialValues = {
		avatar: JeffPic,
		author: 'Jeff Lar',
		content: '',
	}

	const validationSchema = Yup.object().shape({
		content: Yup.string().required('Required')
	})

	const onSubmit = async (values) => {
		handleIsSubmitting(true)
		// backend addCommmentToPost(postId, comment)

		setTimeout(() => {
			console.log('Values: ', values)
			if (addComment) {
				addComment(values)
			}
			handleIsSubmitting(false)
			onClose()
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
							<Form id="commentform">
								<FormikControl control="textarea" label="Comment" name="content" />
							</Form>
						</div>
					)
				}
			}
		</Formik>
	)
}

export default CommentFormContainer