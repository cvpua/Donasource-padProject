import React from 'react'
import styled from 'styled-components'
import Typography from './Typography.js'
import theme from './theme.js'

const StyledButton = styled.button`
	width: 250px;
	height: 40px;
	border: none;
	border-radius: 10px;
	background-color: #FFF;
	text-transform: uppercase;
	color: ${theme.color.dimGray};
	&:hover {
		cursor: pointer;
		background-image: linear-gradient(to right, #028090, #02C39A);
		color: ${theme.color.paleSpringBud};
	}
`

const Button = (props) => {
	return (
		<StyledButton>
			<Typography variant="button-text" weight={700}>
				{props.name}
			</Typography>
		</StyledButton>
	)
}

export default Button