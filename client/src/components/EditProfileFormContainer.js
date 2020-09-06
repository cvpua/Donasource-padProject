import React, { useState, useContext } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl.js'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Toast from './Toast.js'
import { UserContext } from '../App.js'

const EditProfileFormContainer = (props) => {
	const [ USER ] = useContext(UserContext)
	const { token } = USER

	const { onClose, handleIsSubmitting, profile, updateProfile } = props

	let history = useHistory()

	const {
		_id: userId,
		avatar,
		username,
		name,
		location,
		email,
		contactNumber,
		bio,
	} = profile

	const [message, setMessage] = useState()

	const initialValues = {
		avatar: avatar,
		username: username,
		name: {
			firstName: name.firstName,
			lastName: name.lastName,
		},
		location: location || "",
		email: email,
		contactNumber: contactNumber,
		bio: bio || "",
	}

	const validationSchema = Yup.object().shape({
		username: Yup.string().matches(/^\S*$/, "Invalid username").required('Required'),
		name: Yup.object().shape({
			firstName: Yup.string().required('Required'),
			lastName: Yup.string().required('Required'),
		}).required('Required'),
		location: Yup.string(),
		email: Yup.string().email('Invalid email').required('Required'),
		contactNumber: Yup.string().matches(/^(09|\+639)\d{9}$/, 'Enter valid phone number').required('Required'),
		bio: Yup.string()
	})

	const onSubmit = async (values) => {
		handleIsSubmitting(true)

		let formData = new FormData();
	
		for(var key in values){
			if (key === "name"){
				formData.append(key, JSON.stringify(values[key]));
			}else if(key === "avatar" && values[key] && values[key]._id){
				formData.append(key,values[key]._id)
			}
			else{
				formData.append(key,values[key]);
			}
		}


		try{
			const { data } = await axios.patch(`/api/users/${userId}/editUser`, 
				formData,
				{
				headers: {
				'Authorization': 'Bearer ' + token,
				'Content-Type' : "multipart/form-data; boundary=<calculated when request is sent>"
				}
			}
				)
			const { user: newUser } = data
			updateProfile(newUser)

			const { name, username, email, avatar } = newUser
			const USER = JSON.parse(localStorage.getItem("user"))
			const { user: oldUser } = USER
			
			const user = {
				...oldUser,
				name,
				username,
				email,
				avatar
			}

			const NEW_USER = {
				...USER,
				user
			}

			localStorage.setItem("user", JSON.stringify(NEW_USER))

			handleIsSubmitting(false)
			onClose()
			history.push(`${username}`)
		}catch(error){
			handleIsSubmitting(true)
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
							<Form id="editProfileForm">
								<FormikControl control="image" label="Change Avatar" name="avatar" type="file" accept="image/*" form={formikProps}/>
								<FormikControl control="input" label="Username" name="username" />
								<FormikControl control="input" label="First Name" name="name.firstName" />
								<FormikControl control="input" label="Last Name" name="name.lastName" />
								<FormikControl control="input" label="Location" name="location" />
								<FormikControl control="input" label="Email" name="email" />
								<FormikControl control="input" type="tel" label="Contact number" name="contactNumber" />
								<FormikControl control="textarea" label="Bio" name="bio" />
							</Form>
						</div>
					)
				}
			}
		</Formik>
		</React.Fragment>
	)
}

export default EditProfileFormContainer