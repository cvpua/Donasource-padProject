import styled from 'styled-components'
import {Link} from 'react-router-dom'
import theme from '../components/home/theme.js'

const StyledLink = styled(Link)`
	text-decoration: none;
	color: ${theme.color.persianGreen};
	margin-bottom: 30px;
	display: flex;
	align-items: center;
	padding: 20px 20px 0 20px;
`

export default StyledLink