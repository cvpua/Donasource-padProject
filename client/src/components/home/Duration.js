import React from 'react'
import styled from 'styled-components'
import Typography from './Typography.js'

const StyledDuration = styled.div`
	padding: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #F0F3BD;
	border-radius: 8px;
	color: #05668D;
	font-size: 14px;
	text-align: center;
`

const Duration = (props) => {
	return (
		<StyledDuration>
			<Typography variant="button-text" weight={700}>
				{props.duration}
				{ props.duration === 1 ? " day left" : " days left" }
			</Typography>		
		</StyledDuration>
	)
}

export default Duration