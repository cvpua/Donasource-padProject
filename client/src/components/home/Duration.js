import React from 'react'
import styled from 'styled-components'
import Typography from './Typography.js'

const StyledDuration = styled.div`
	width: 115px;
	height: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #F0F3BD;
	border-radius: 44px;
	color: #05668D;
	margin-left: 10px;
	font-size: 14px;
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