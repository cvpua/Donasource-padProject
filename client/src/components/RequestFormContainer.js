import React,{ useContext, useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl.js'
import axios from 'axios'
import { UserContext } from '../App.js'
import Toast from './Toast.js'

const RequestFormContainer = (props) => {
	const { onClose, handleIsSubmitting, items, postId } = props

	const [USER] = useContext(UserContext)
	const { user, token } = USER
	const { _id: userId } = user

	const [message, setMessage] = useState()

	const initialValues = {
		items: 
			items.map((item) => (
				{
					itemId: item._id,
					name: item.name,
					amount: item.amount,
					total: item.total,
					amountRequested: 0,
				}
			)),
		reason: '',
		userId: userId,
		totalRequest: 0,
	}

	const validationSchema = Yup.object().shape({
		items: Yup.array().of(
			Yup.object().shape({
				name: Yup.string(),
				total: Yup.number(),
				amount: Yup.number().min(0, 'Too Much'),
				amountRequested: Yup.number(),
			})
		).required('Required'),
		reason: Yup.string().required('Required'),
		totalRequest: Yup.number().min(1, "Request at least one item")
	})

	const onSubmit = async (values) => {
		handleIsSubmitting(true)
		try {
			const { data } = await axios.patch(
				`/api/posts/${postId}/request`, 
				values,
				{
					headers: {
						'Authorization': 'Bearer ' + token,
					}
				}
			)
			handleIsSubmitting(false)
			onClose()
		}catch (error){
			setMessage({
        title: "Error",
        description: error.response.data.message,
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
							<Form id="requestForm">
								{
									initialValues.items.map((item,index) => (
										item.amount > 0 ? <FormikControl 
											control="request" 
											label={item.name} 
											index={index}
											amount={item.amount}
											name="items" 
											type="number"
										/>
										: null
									))
								}
								<FormikControl control="textarea" label="Reason" name="reason" />
							</Form>
						</div>
					)
				}
			}
		</Formik>
		</React.Fragment>
	)
}

export default RequestFormContainer