import React from 'react'
import MyInput from './MyInput.js'
import MyTextarea from './MyTextarea.js'
import MyRadio from './MyRadio.js'
import MyItems from './MyItems.js'
import MyTags from './MyTags.js'
import MyImages from './MyImages.js'


const FormikControl = (props) => {
	const { control, ...rest } = props

	switch(control) {
		case 'input': return <MyInput {...rest} />
		case 'textarea': return <MyTextarea {...rest} />
		// case 'select': return <Input {...rest} />
		case 'radio': return <MyRadio {...rest} />
		// case 'checkbox': return <Input {...rest} />
		// case 'date':
		case 'items': return <MyItems {...rest} />
		case 'tags' : return <MyTags {...rest} />
		case 'images': return <MyImages {...rest} />
		default: return null
	}
}

export default FormikControl