import React from 'react'
import MyInput from './MyInput.js'
import MyTextarea from './MyTextarea.js'
import MyRadio from './MyRadio.js'
import MyItems from './MyItems.js'
import MyTags from './MyTags.js'
import MyImages from './MyImages.js'
import MyPassword from './MyPassword.js'
import MyNumeric from './MyNumeric.js'
import MyDate from './MyDate.js'
import MyRequest from './MyRequest.js'
import MyImage from './MyImage.js'

const FormikControl = (props) => {
	const { control, ...rest } = props

	switch(control) {
		case 'input': return <MyInput {...rest} />
		case 'textarea': return <MyTextarea {...rest} />
		// case 'select': return <Input {...rest} />
		case 'radio': return <MyRadio {...rest} />
		// case 'checkbox': return <Input {...rest} />
		case 'date': return <MyDate {...rest} />
		case 'items': return <MyItems {...rest} />
		case 'tags' : return <MyTags {...rest} />
		case 'images': return <MyImages {...rest} />
		case 'image': return <MyImage {...rest} />
		case 'password': return <MyPassword {...rest} />
		case 'numeric': return <MyNumeric {...rest} />
		case 'request': return <MyRequest {...rest} />
		default: return null
	}
}

export default FormikControl