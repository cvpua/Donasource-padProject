import React,{useState} from 'react'
import styled from 'styled-components'
import theme from './theme.js'
import Typography from './Typography.js'

const INITIAL_STATE = {
    req_title : "",
    req_description : "",
    req_quantity : "",
    req_duration_date :  "",
    req_duration_time :  "",      
    req_location : "",
    req_image: ""
}

const Modal = styled.div`
	display: ${props => props.open ? 'flex' : 'none'};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.6);
`

const PostContainer = styled.div`
  width: 40%;
  border-radius: ${theme.spacing(1)};
  margin: auto;
  background-color: ${theme.color.white};
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
`

const FormButton = styled.div`
	padding: 10px 30px;
	display: flex;
	justify-content: space-between;
`

const CloseButton = styled.span`
	font-size: 30px;
	&:hover {
		cursor: pointer;
		color: gray;
	}
`

const Form = styled.form`
	display: flex;
	flex-direction: column;
	margin: 20px 30px;
`

const FormInput = styled.div`
	margin: 10px 0px;
	display: flex;
	flex-direction: column;
`

const StyledLabel = styled.label`
	margin-bottom: 5px;
	color: ${theme.color.jetBlack};
	font-family: Lato;
`

const FormType = styled.label`
	display: flex;
	justify-content: center;
`

const FormTypeInput = styled.span`
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

const SubmitButton = styled.button`
	width: 90px;
	height: 40px;
	border: none;
	border-radius: 10px;
	color: ${theme.color.paleSpringBud};
	background-image: linear-gradient(to right, #028090, #02C39A);
	&:hover {
		cursor: pointer;
	}
`

const PostForm = ({open, handleClose}) => {
	const [formType, setFormType] = useState('donate')
	
	const [state, setState] = useState(INITIAL_STATE)

	const handleInputChange = (event) => {
    const { target } = event;
    setState({[target.name]: target.value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
// not yet done    
   const {req_title,req_description,req_quantity,req_duration_date,req_duration_time,req_location,req_image} = state;

   console.log(req_title)
   console.log(req_description)
   console.log(req_quantity)
   console.log(req_duration_date)
   console.log(req_duration_time)
   console.log(req_location)
   console.log(req_image)

   setState(INITIAL_STATE)

  };  

	return (
		<Modal open={open}>
			<PostContainer>
				<FormButton>
					<CloseButton onClick={() => handleClose()}>&#8592;</CloseButton>
          <SubmitButton type="submit" form="form-A">
          	<Typography variant="button-text" weight={700}>Add</Typography>
          </SubmitButton>
				</FormButton>
				<div>
					<Form id="form-A" onSubmit={(e) => handleFormSubmit(e)}>
						<FormType onChange={(e) => setFormType(e.target.value)}>
              <input style={{display:'none'}} type="radio" id="donate"  name= "post" value="donate" />
              <StyledLabel htmlFor="donate"><FormTypeInput current="donate" type={formType} >Donate</FormTypeInput></StyledLabel>
              <input style={{display:'none'}} type="radio" id="request" name= "post" value="request" />
              <StyledLabel htmlFor="request"><FormTypeInput current="request" type={formType} >Request</FormTypeInput></StyledLabel>
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
				</div>
			</PostContainer>
		</Modal>
	)
}

export default PostForm