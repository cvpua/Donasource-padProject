import styled from 'styled-components'
import theme from '../theme.js'

const CardAction = styled.div`
	display: flex;
	justify-content: space-evenly;
	padding-top: 5px;
	border-top: 1px solid ${theme.color.gainsboro};
	position: relative;
	z-index: 2;
`

export default CardAction