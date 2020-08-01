import React from 'react'
import styled from 'styled-components'


const StyledAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: top center;
`

const Avatar = (props) => {
	return (
		<StyledAvatar src={props.src}/>
	)
}

export default Avatar