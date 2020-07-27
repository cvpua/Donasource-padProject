import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const StyledSideBar = styled.div`
	width: 25%;
	min-width: 200px;
	height: 100%;
	background-color: #FFF;
	position: fixed;
`

const StyledContainer = styled.div`
	height: 500px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	padding-top: 40px;
`

const StyledNav = styled.nav`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	padding: 0;
	margin: 0;
`

const StyledLink = styled(Link)`
	width: 200px;
	text-decoration: none;
	border: 2px solid #02C39A;
	border-radius: 20px;
	color: #02C39A;
	padding: 10px 30px;
	text-align: center;
	margin-bottom: 20px;
`

const StyledLogout = styled(StyledLink)`
	background-color: #00A896;
	color: #FFF;
	border: none;
`

const Sidebar = () => {
	return (
		<StyledSideBar>
			<StyledContainer>
				<StyledNav>
					<StyledLink to="/home">Home</StyledLink>
					<StyledLink to="/profile">Profile</StyledLink>
					<StyledLink to="/donation">Donation</StyledLink>
					<StyledLink to="/request">Request</StyledLink>
					<StyledLink to="/avail">Avail</StyledLink>
				</StyledNav>
				<StyledLogout to="/">Logout</StyledLogout>
			</StyledContainer>
		</StyledSideBar>
	)
}


export default Sidebar