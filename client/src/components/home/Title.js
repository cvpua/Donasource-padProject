import React from 'react'
import styled from 'styled-components'

const StyledTitle = styled.h3`
	margin: 0;
	color: #FFF;
`

const Title = (props) => {
	return (
		<StyledTitle>
			{props.title}
		</StyledTitle>
	)
}

export default Title