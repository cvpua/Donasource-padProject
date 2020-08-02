import React from 'react'
import styled from 'styled-components'
import {Link as RouterLink} from 'react-router-dom'
import theme from './theme.js'
import Typography from './Typography.js'

const StyledLink = styled(RouterLink)`
	text-decoration: none;
	color: ${theme.color.persianGreen};
	margin-bottom: 30px;
	display: flex;
	align-items: center;
	padding: 20px 20px 0 20px;
`
const StyledIcon = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 20px;
	@media (min-width: 750px)	{
		padding-right: 20px;
	}
`

const Text = styled.div`
	display: none;
	@media (min-width: 750px)	{
		display: block;
	}
`


const Link = (props) => {
	return(
		<StyledLink to={props.to}>
			<StyledIcon>{props.children}</StyledIcon>
			<Text>
				<Typography variant="button-text">{props.text}</Typography>
			</Text>
		</StyledLink>
	)
}

export default Link