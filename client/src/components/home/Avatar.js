import React from 'react'
import styled from 'styled-components'


const StyledAvatar = styled.div`
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: 50%;
  background-color: white;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: top center;
`

StyledAvatar.defaultProps = {
	size: "50px",
}

const Avatar = (props) => {
	return (
		<StyledAvatar src={props.src} size={props.size}/>
	)
}

export default Avatar