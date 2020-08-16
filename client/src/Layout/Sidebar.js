import React from 'react'
import styled from 'styled-components'
import Row from '../components/home/Row.js'
import theme from '../components/home/theme.js'
import Link from '../components/home/Link.js'
import Navigation from '../components/home/Navigation.js'
import {FaHome,FaBell,FaList,FaUserAlt} from 'react-icons/fa'

const StyledSidebar = styled(Row)`
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

const Sidebar = () => {
	return(
		<StyledSidebar flexGrow={1}>
			<Navigation>
				<Link to=flex"/home" text="Home">
					<FaHome />
				</Link>
				<Link to="/notification" text="Notification">
					<FaBell />
				</Link>
				<Link to="/avail" text="Avails">
					<FaList/>
				</Link>
				<Link to="/profile" text="Profile">
					<FaUserAlt/>
				</Link>
			</Navigation>
		</StyledSidebar>
	)
}


export default Sidebar