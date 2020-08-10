import styled from 'styled-components'
import Row from '../components/home/Row.js'

const Ads = styled(Row)`
	display: none;
	@media (min-width: 900px) {
		display: block;
		max-width: 300px;
		min-width: 100px;
	}
`
export default Ads