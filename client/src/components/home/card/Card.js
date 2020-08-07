import styled from 'styled-components'
import theme from '../theme.js'

const Card = styled.div`
	background-color: ${theme.color.white};
	box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
	border-radius: ${theme.spacing(1)};
	margin-top: 10px;
`

export default Card