import React from 'react'
import styled from 'styled-components'

const StyledBadge = styled.div`
	width: 150px;
	height: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${props => props.type ? "#02C39A" : "#05668D"};
	color: #F0F3BD;
	text-transform: uppercase;
	border-radius: 5px;
`

const Badge = (props) => {
	return (
		<StyledBadge type={props.type}>
			{props.name}
		</StyledBadge>
	)
}

export default Badge