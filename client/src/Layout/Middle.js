import styled from 'styled-components'
import Row from './Row.js'
import theme from '../components/home/theme.js'

const Middle = styled(Row)`
	border-right: 1px solid ${theme.color.gainsboro};
	@media (min-width: 600px)	{
		width: 600px;
	}
`

export default Middle