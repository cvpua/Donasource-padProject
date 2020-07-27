import React from 'react'
import styled from 'styled-components'

const StyledName = styled.h3`
	margin: 0;
	color: #FFF;
`

const Name = (props) => {
	return (
		<StyledName>
			{props.name}
		</StyledName>
	)
}

export default Name