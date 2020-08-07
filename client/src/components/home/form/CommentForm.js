import React,{useState} from 'react'
import Modal from './Modal.js'
import FormContainer from './FormContainer.js'
import FormButton from './FormButton.js'
import {FaWindowClose} from 'react-icons/fa'
import styled from 'styled-components'
import theme from '../theme.js'
import Jeff from '../../../assets/Jeff.jpg'

const StyledIcon = styled(FaWindowClose)`
	font-size: 20px;
	color: ${theme.color.jetBlack};
	&:hover {
		cursor: pointer;
		color: ${theme.color.persianGreen};
	}
`

const CommentForm = (props) => {
	const [comment, setComment] = useState('')

	const handleInputChange = (e) => {
		setComment(e.target.value)
	}

	const handleFormSubmit = (e) => {
		const newComment = {
			user: {
				avatar: Jeff,
				name: "Jeff Lar",
			},
			content: comment,
		}

		e.preventDefault()
		props.addComment(newComment)
		setComment('')
		props.handleClose()
	}

	return (
		<Modal open={props.open}>
			<FormContainer>
				<StyledIcon  onClick={() => props.handleClose()}/>
				<form onSubmit={(e) => handleFormSubmit(e)}>
					<label htmlFor="description">Description: </label>
          <textarea 
            id = "description" 
            placeholder="Reason why you need it, include if it is in piece or pack..."
            name ="req_description"  
            onChange={(e) => handleInputChange(e)}   
          />
          <button type="submit">Add</button>
				</form>
			</FormContainer>
		</Modal>
	)
}

export default CommentForm