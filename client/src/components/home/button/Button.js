import React,{useState} from 'react'
import styled from 'styled-components'
import Typography from '../Typography.js'
import theme from '../theme.js'

const StyledButton = styled.button`
	width: 30%;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	border: none;
	background-color: #FFF;
	text-transform: uppercase;
	color: ${theme.color.dimGray};
	&:hover {
		cursor: pointer;
		color: ${theme.color.persianGreen};
		background: linear-gradient(to right, #028090, #02C39A);
		-webkit-background-clip: text;
 		-webkit-text-fill-color: transparent;
	}
`

const StyledIcon = styled.div`
	padding-right: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 20px;
`

const Button = (props) => {

	return (
		<StyledButton>
			<StyledIcon>
				{props.children}
			</StyledIcon>
			<Typography variant="button-text" weight={900}>
			</Typography>
		</StyledButton>
	)
}

export default Button