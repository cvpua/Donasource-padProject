import React,{ useContext, useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl.js'
import axios from 'axios'
import { UserContext } from '../App.js'
import Toast from './Toast.js'

const CommentFormContainer = (props) => {
	const { onClose, handleIsSubmitting, addComment, postId } = props

	const [USER] = useContext(UserContext)
	const { user } = USER
	const { _id: userId } = user

	const [message, setMessage] = useState()

	const initialValues = {
		userId: userId,
		content: '',
	}

	const validationSchema = Yup.object().shape({
		content: Yup.string().required('Required')
	})

	const onSubmit = async (values) => {
		handleIsSubmitting(true)
		try {
			const { data } = await axios.patch(`/api/posts/${postId}/comments`, values)
			if (addComment) {
				addComment({
					...data.comment,
					user: {
						...data.user
					}
				})
			}
			handleIsSubmitting(false)
			onClose()
		}catch (error){
			setMessage({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      })
		}
	}

	return (
		<React.Fragment>
		<Toast message={message} />
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
		>
			{
				(formikProps) => {
					return (<div>
							<Form id="commentForm">
								<FormikControl control="textarea" label="Comment" name="content" />
							</Form>
						</div>
					)
				}
			}
		</Formik>
		</React.Fragment>
	)
}

export default CommentFormContainer