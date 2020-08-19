import React,{useContext} from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl.js'
import axios from 'axios'
import MarcoPic from '../assets/dp.jpg'
import {UserContext} from '../App.js'
import { Types } from 'mongoose'

const PostFormContainer = (props) => {
	const { onClose, handleIsSubmitting, createPost } = props

	const user = useContext(UserContext)

	const initialValues = {
		avatar: MarcoPic,
		author: 'Marco Mirandilla',
		title: 'Penge Ayuda',
		description: 'Wala lang',
		type: 'donation',
		location: 'Gumaca',
		deadline: new Date(),
		items: [{name: '', total: '', amount: 0}],
		tags: ['Food'],
		images: [],
		comments: [],
	}
	const validationSchema = Yup.object().shape({
		title: Yup.string().required('Required'),
		description: Yup.string().required('Required'),
		type: Yup.string().required('Required'),
		location: Yup.string().required('Required'),
		deadline: Yup.date().min(initialValues.deadline,'Invalid Date'),
		items: Yup.array()
			.of(
				Yup.object().shape({
					name: Yup.string().required('Required'),
					total: Yup.number().required('Required')
				})
			).required('Required'),
		tags: Yup.array()
			.of(
				Yup.string().required('Required')
			).required('Required')
	})

	const onSubmit = async (values) => {
		handleIsSubmitting(true)
		
		// Eto nadagdag
		let formData = new FormData();
		for(var key in values){
			if(key === "items"){
				formData.append(key,JSON.stringify(values[key]));
			}else if(key === "images"){
				const imageLength = values[key].length;
				for(let i = 0; i < imageLength ; i++){
					formData.append(key,values[key][i]);
				}
			}else{
				formData.append(key,values[key]);
			}
		}
		formData.append('status','not fulfilled');
		// --------------------------------

		try {
			const { data } = await axios.post(
				'/api/posts', 
				formData, //pinaltan ko ung pinapasa
				{
					headers: {
						'Authorization': 'Bearer ' + user.token,
						'Content-Type' : "multipart/form-data; boundary=<calculated when request is sent>"
					}
				}
			)
			alert(data.message)
			createPost(values)
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
					return (<div>
							<Form id="postform" >
								<FormikControl control="radio" label="Type" name="type" />
								<FormikControl control="input" type="text" label="Title" name="title" />
								<FormikControl control="textarea" label="Description" name="description" />
								<FormikControl control="input" type="text" label="Location" name="location" />
								<FormikControl control="input" type="date" label="Deadline" name="deadline" />
								<FormikControl control="items" label="Items" name="items" />
								<FormikControl control="tags" label="Tags" name="tags" />
								<FormikControl control="images" type="file" name="images" label="Add Image" multiple="multiple" accept="image/*" form={formikProps}/>
							</Form>
						</div>
					)
				}
			}
			
		</Formik>
	)
}

export default PostFormContainer