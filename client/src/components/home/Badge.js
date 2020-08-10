import React from 'react'
import styled from 'styled-components'
import Typography from './Typography.js'

const StyledBadge = styled.div`
	width: 100px;
	height: 20px;
	padding: 3px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${props => props.type === "type" ? "#02C39A" : "#05668D"};
	color: #F0F3BD;
	text-transform: uppercase;
	border-radius: 5px;
	font-size: 14px;
`

const Badge = (props) => {
	return (
		<StyledBadge type={props.type}>
			<Typography variant="button-text" weight={700}>
				{props.name}
			</Typography>
		</StyledBadge>
	)
}

export default Badge