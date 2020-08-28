import React,{useContext} from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl.js'
import axios from 'axios'
import { UserContext } from '../App.js'

const PostFormContainer = (props) => {
	const { onClose, handleIsSubmitting, createPost } = props

	const [ USER ] = useContext(UserContext)
	const { user, token } = USER

	const initialValues = {
		userId: user._id,
		avatar: user.photo,
		name: {
			firstName: user.name.firstName,
			lastName: user.name.lastName,
		},
		username: user.username,
		title: '',
		description: '',
		type: 'donation',
		location: '',
		deadline: new Date(),
		items: [{name: '', total: 1, amount: 0, donor:[]}],
		tags: ['Food'],
		images: [],
		status: "PENDING",
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
					total: Yup.number().min(1, 'Minimum of one item').required('Required')
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
			}else if (key === "name"){
				formData.append(key, JSON.stringify(values[key]));
			}else if(key === "images"){
				const imageLength = values[key].length;
				for(let i = 0; i < imageLength ; i++){
					formData.append(key,values[key][i]);
				}
			}else{
				formData.append(key,values[key]);
			}
		}

		// --------------------------------

		try {
			const { data } = await axios.post(
				'/api/posts', 
				formData, //pinaltan ko ung pinapasa
				{
					headers: {
						'Authorization': 'Bearer ' + token,
						'Content-Type' : "multipart/form-data; boundary=<calculated when request is sent>"
					}
				}
			)
			console.log('Post Form: ', formData)
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