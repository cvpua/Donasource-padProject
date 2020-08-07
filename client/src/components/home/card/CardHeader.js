import styled from 'styled-components'
import theme from '../theme.js'

const CardHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20px;
	border-bottom: 1px solid #DDD;
	border-top-left-radius: ${theme.spacing(1)};
	border-top-right-radius: ${theme.spacing(1)};
	background-image: linear-gradient(to right, #028090, #02C39A);
`

export default CardHeader