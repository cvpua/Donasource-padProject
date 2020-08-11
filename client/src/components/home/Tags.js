import React from 'react'
import styled from 'styled-components'

const Tag = styled.div`
	height: 20px;
	border: 1px solid black;
`

const StyledTags = styled.div`
	display: flex
`

const Tags = (props) => {
	return (
		<StyledTags>
			Tags:
			{props.data.map((tag) =>(
				<Tag key={tag}>{tag}</Tag>
			))}
		</StyledTags>
	)
}

export default Tags