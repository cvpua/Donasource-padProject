import React, { useContext } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl.js'
import { UserContext } from '../App.js'

// To do: 
// Add the data of the donor
// Alter the values/data to be submitted in the onSubmit so that the remaining attribute is not inlcuded 
// Change the setFieldValue on MyNumeric. The value that should be setted is the combination of current amount and the previous amount

const DonateFormContainer = (props) => {
	const { onClose, handleIsSubmitting, items } = props

	const USER = useContext(UserContext)
	const { user } = USER

	const { _id: userId } = user

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
							amountDonated: 1,
							date: new Date(),
						}
					]
				}
			))
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
						amountDonated: Yup.number().min(1, 'Donate at least one item').required('Required'),
						date: Yup.date(),
					})
				)
			})
		).required('Required')
	})

	const onSubmit = async (values) => {
		// Remove the remaining attribute
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
							<Form id="donateForm">
								{
									items.map((item,index) => (
										<FormikControl 
											control="numeric" 
											label={item.name} 
											index={index}
											amount={item.amount}
											donorLength={item.donor.length}
											name="items" 
											type="number"
										/>
									))
								}
							</Form>
						</div>
					)
				}
			}
		</Formik>
	)
}

export default DonateFormContainer