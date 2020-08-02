import styled from 'styled-components'

const Navigation = styled.nav`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	@media (min-width: 750px)	{
		align-items: flex-start;
		padding-left: 20px;
		padding-right: 30px;
	}
`

export default Navigation