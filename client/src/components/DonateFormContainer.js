import React, { useContext } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl.js'
import { FormErrorMessage, FormControl } from '@chakra-ui/core'
import { UserContext } from '../App.js'
import axios from 'axios'

const DonateFormContainer = (props) => {
	const { onClose, handleIsSubmitting, items, donate, postId } = props

	const [USER] = useContext(UserContext)
	const { user } = USER

	const { _id: userId, username, name } = user

	const initialValues = {
		items: 
			items.map((item) => (
				{
					...item,
					remaining: item.total - item.amount,
					donor: [
						...item.donor,
						{
							userId: userId,
							amountDonated: 0,
							date: new Date(),
						}
					]
				}
			)),
		totalDonation: 0,
		userId: userId,
		username: username,
		name: name,
	}

	const validationSchema = (values) => Yup.object().shape({
		items: Yup.array().of(
			Yup.object().shape({
				name: Yup.string(),
				total: Yup.number(),
				remaining: Yup.number(),
				amount: Yup.number().max(Yup.ref('total'), 'Too Much'),
				donor: Yup.array().of(
					Yup.object().shape({
						userId: Yup.string(),
						amountDonated: Yup.number(),
						date: Yup.date(),
					})
				)
			})
		).required('Required'),
		totalDonation: Yup.number().min(1, "Donate at least one item")
	})

	const onSubmit = async (values) => {
		handleIsSubmitting(true)

		try {
			const { data } = await axios.put(`/api/posts/${postId}/donate`, values)
			alert(data.message)
			donate(values.items)
			handleIsSubmitting(false)
			onClose()
		}catch(error){
			alert(error.message)
			handleIsSubmitting(false)
			onClose()
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
					console.log('Formik  Props: ', formikProps)
					return (<div>
							<Form id="donateform">
								{
									
									initialValues.items.map((item,index) => (
										item.remaining !== 0 ? <FormikControl 
											control="numeric" 
											label={item.name} 
											index={index}
											amount={item.amount}
											donorLength={item.donor.length}
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
	)
}

export default DonateFormContainer