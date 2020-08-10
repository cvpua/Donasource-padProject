import React from 'react'
import styled from 'styled-components'
import Typography from '../components/home/Typography.js'
import theme from '../components/home/theme.js'

const StyledHeader = styled.div`
	height: ${theme.spacing(8)};
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom: 1px solid ${theme.color.gainsboro};
	background-color: ${theme.color.persianGreen};
`

const Header = (props) => {
	return (
		<StyledHeader>
			<Typography 
				variant="h1" 
				color={theme.color.beige}
				weight={900}
			>
				{props.title}
			</Typography>
		</StyledHeader>
	)
}

export default Header