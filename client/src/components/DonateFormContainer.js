import React, { useContext, useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl.js'
import { FormErrorMessage, FormControl } from '@chakra-ui/core'
import { UserContext } from '../App.js'
import axios from 'axios'
import Toast from './Toast.js'

const DonateFormContainer = (props) => {
	const { onClose, handleIsSubmitting, items, donate, postId } = props

	const [USER] = useContext(UserContext)
	const { user } = USER

	const { _id: userId } = user

	const [message, setMessage] = useState()

	const initialValues = {
		items: 
			items.map((item) => (
				{
					...item,
					donor: {
						user: userId,
						amountDonated: 0,
					}
				}
			)),
		totalDonation: 0,
		userId: userId,
	}

	const validationSchema = (values) => Yup.object().shape({
		items: Yup.array().of(
			Yup.object().shape({
				name: Yup.string(),
				total: Yup.number(),
				amount: Yup.number().max(Yup.ref('total'), 'Too Much'),
				donor: 
						Yup.object().shape({
						userId: Yup.string(),
						amountDonated: Yup.number(),
						date: Yup.date(),
					})
			})
		).required('Required'),
		totalDonation: Yup.number().min(1, "Donate at least one item")
	})

	const onSubmit = async (values) => {
		handleIsSubmitting(true)

		try {
			const { data } = await axios.put(`/api/posts/${postId}/donate`, values)
			donate(data.items)
			handleIsSubmitting(false)
			onClose()
		}catch(error){
			setMessage({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      })
			handleIsSubmitting(false)
			onClose()
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
					console.log('Formik  Props: ', formikProps)
					return (<div>
							<Form id="donateForm">
								{
									
									initialValues.items.map((item,index) => (
										item.amount !== item.total ? <FormikControl 
											control="numeric" 
											label={item.name} 
											index={index}
											amount={item.amount}
											name="items" 
											type="number"
										/>
										: null
									))
								}
							</Form>
							<FormControl isInvalid={formikProps.errors.totalDonation}>
								<FormErrorMessage>
									{
										formikProps.errors.totalDonation
									}
								</FormErrorMessage>
							</FormControl>
						</div>
					)
				}
			}
		</Formik>
		</React.Fragment>
	)
}

export default DonateFormContainer