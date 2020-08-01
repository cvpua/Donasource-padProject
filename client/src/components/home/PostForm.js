import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import theme from './theme.js'
import Typography from './Typography.js'
import { FaPlus } from 'react-icons/fa'
import { FeedContext } from '../../App.js'

const INITIAL_STATE = {
    req_title: "",
    req_description: "",
    req_quantity: "",
    req_duration_date: "",
    req_duration_time: "",
    req_location: "",
    req_image: ""
}

const Modal = styled.div `
	display: ${props => props.open ? 'flex' : 'none'};
  position: fixed;
  z-index: 3;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.6);
`

const PostContainer = styled.div `
  width: 90%;
  max-width: 600px;
  border-radius: ${theme.spacing(1)};
  margin: auto;
  background-color: ${theme.color.white};
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
`

const FormButton = styled.div `
	padding-bottom: 10px;
`

const CloseButton = styled.span `
	font-size: 30px;
	&:hover {
		cursor: pointer;
		color: gray;
	}
`

const Form = styled.form `
	display: flex;
	flex-direction: column;
`

const FormInput = styled.div `
	margin: 10px 0px;
	display: flex;
	flex-direction: column;
`

const StyledLabel = styled.label `
	margin-bottom: 5px;
	color: ${theme.color.jetBlack};
	font-family: Lato;
`

const FormType = styled.label `
	display: flex;
	justify-content: center;
`

const FormTypeInput = styled.span `
	padding: 5px 30px;
	margin: 5px;
	font-family: Lato;
	font-weight: 700;
	border-radius: ${theme.spacing(8)};
	cursor: pointer; 
	background-color: ${props => props.current === props.type ? 
		theme.color.metallicSeaweed
		: 'none'
	};
	color: ${props => props.current === props.type ? 
		theme.color.paleSpringBud
		: ''
	};
`

const SubmitButton = styled.button `
	width: 100%;
	height: 40px;
	border: none;
	border-radius: ${theme.spacing(1)};
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${theme.color.paleSpringBud};
	background-image: linear-gradient(to right, #028090, #02C39A);
	margin: auto;
	&:hover {
		cursor: pointer;
	}
`

const StyledIcon = styled(FaPlus)
`
	padding-right: 5px;
	font-size: 15px;
`

const Container = styled.div `
	
`

const PostForm = ({ open, handleClose }) => {
    const [formType, setFormType] = useState('donate')

    const [state, setState] = useState(INITIAL_STATE)

    const { addPost } = useContext(FeedContext)

    const handleInputChange = (event) => {
        const { target } = event;
        setState(prevState => ({
            ...prevState,
            [target.name]: target.value,
        }))
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const {
            req_title: title,
            req_description: description,
            req_quantity: quantity,
            req_duration_date: durationDate,
            req_duration_time: durationTime,
            req_location: location,
        } = state

        const data = { title, description, quantity, durationDate, durationTime, location, type: formType }

        addPost(data)
        handleClose()
        setState(INITIAL_STATE)

    };

    return (
        <Modal open={open}>
			<PostContainer>
				<FormButton>
					<CloseButton onClick={() => handleClose()}>&#8592;</CloseButton>
				</FormButton>
				<div>
					<Form id="form-A" onSubmit={(e) => handleFormSubmit(e)}>
						<FormType onChange={(e) => setFormType(e.target.value)}>
              <input style={{display:'none'}} type="radio" id="donate"  name= "post" value="donate" />
              <label htmlFor="donate"><FormTypeInput current="donate" type={formType} >Donation</FormTypeInput></label>
              <input style={{display:'none'}} type="radio" id="request" name= "post" value="request" />
              <label htmlFor="request"><FormTypeInput current="request" type={formType} >Request</FormTypeInput></label>
						</FormType>
						<FormInput>
						<StyledLabel htmlFor="title">Title: </StyledLabel>
            <input 
	            id = "title" 
	            placeholder="Item to request..."
	            name = "req_title"
	            onChange={(e) => handleInputChange(e)}    
	          />
	          </FormInput>
	          <FormInput>
	          <StyledLabel htmlFor="description">Description: </StyledLabel>
	          <textarea 
	            id = "description" 
	            placeholder="Reason why you need it, include if it is in piece or pack..."
	            name ="req_description"  
	            onChange={(e) => handleInputChange(e)}   
	          />
	          </FormInput>
	          <FormInput>
	          <StyledLabel htmlFor="quantity">Quantity: </StyledLabel>
            <input 
	            id = "quantity" 
	            type="number" 
	            placeholder="0"
	            name = "req_quantity"   
	            onChange={(e) => handleInputChange(e)}  
	          />
	          </FormInput>
	          <FormInput>
	          <StyledLabel htmlFor="duration">Duration: </StyledLabel>
            <input 
              id = "duration" 
              type="date"
              name="req_duration_date"
              onChange={(e) => handleInputChange(e)} 
              /> <br/>
            <input 
              id = "time" 
              type="time" 
              name="req_duration_time"
              onChange={(e) => handleInputChange(e)}     
            />
            </FormInput>
            <FormInput>
            <StyledLabel htmlFor="location">Location: </StyledLabel>
            <input 
                id = "location"
                placeholder="Ph"
                name="req_location"
                onChange={(e) => handleInputChange(e)}  
                />
            </FormInput>
            <FormInput>
            <StyledLabel htmlFor="image">Attach image: </StyledLabel>
            <input 
                id = "image" 
                type="file" 
                multiple
                name="req_image"
                onChange={(e) => handleInputChange(e)}     
                />
             </FormInput>
					</Form>
					<Container>
						<SubmitButton type="submit" form="form-A">
	          	<StyledIcon/>
	          	<Typography variant="button-text" weight={700}>
	          		Add
	          	</Typography>
	          </SubmitButton>
          </Container>
				</div>
			</PostContainer>
		</Modal>
    )
}

export default PostForm
