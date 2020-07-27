import React from 'react'
import styled from 'styled-components'


const StyledAvatar = styled.img`
	width: 70px;
	border-radius: 50%;
`

const Avatar = (props) => {
	return (
		<StyledAvatar src={props.src}>
		</StyledAvatar>
	)
}

export default Avatar