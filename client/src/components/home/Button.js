import React from 'react'
import styled from 'styled-components'


const StyledButton = styled.button`
	width: 250px;
	height: 40px;
	border: none;
	border-radius: 40px;
	text-transform: uppercase;
	background-image: linear-gradient(to right, #028090, #02C39A);
	color: #F0F3BD;
	&:hover {
		cursor: pointer;
	}
`

const Button = (props) => {
	return (
		<StyledButton>
			{props.name}
		</StyledButton>
	)
}

export default Button