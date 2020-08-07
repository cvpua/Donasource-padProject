import React from 'react'
import styled from 'styled-components'

const StyledItems = styled.div`
	border: 1px solid #EEE;
	border-radius: 3px;
	padding: 20px;
`

const Items = (props) => {
	const {items} = props

	return (
		<StyledItems>
			Need:<br/>
			<ul>
				{items.map((item) => (
					<li>{item.amount}/{item.total} {item.name}</li>
				))
				}
			</ul>
		</StyledItems>
	)
}

export default Items