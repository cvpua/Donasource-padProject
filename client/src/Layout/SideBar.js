import styled from 'styled-components'
import Row from './Row.js'
import theme from '../components/home/theme.js'

const Sidebar = styled(Row)`
	display: none;
	position: sticky;
	top: 0; 
	height: 100vh;
	border-right: 1px solid ${theme.color.gainsboro};
	@media (min-width: 600px)	{
		display: flex;
		max-width: 300px;
	}
	@media (min-width: 900px)	{
		flex-grow: 0;
	}
`

export default Sidebar