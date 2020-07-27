import React from 'react'
import styled from 'styled-components'

const StyledHeader = styled.div`
	background-color: #00A896;
	height: 70px;
	display: flex;
	justify-content: center;
	align-items: center;
`

const StyledTitle = styled.h1`
	color: #FFF;
`

const Header = (props) => {
	return (
		<StyledHeader>
			<StyledTitle>{props.title}</StyledTitle>
		</StyledHeader>
	)
}

export default Header