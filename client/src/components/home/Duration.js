import React from 'react'
import styled from 'styled-components'

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
`

const Duration = (props) => {
	return (
		<StyledDuration>
			{props.duration} days left		
		</StyledDuration>
	)
}

export default Duration