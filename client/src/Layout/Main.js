import React from 'react'
import Sidebar from './Sidebar.js'
import styled from 'styled-components'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Feed,Profile,Donation,Request,Avail} from '../Sections'

import PostButton from '../components/post-component/PostButton';


const StyledMain = styled.div`
	display: flex;
`

const StyledSection = styled.div`
	margin-left: 25%;
`

const StyledFab = styled.button`
	position:fixed;
	width:60px;
	height:60px;
	bottom:40px;
	right:40px;
	background-color:#F0F3BD;
	color:#FFF;
	border-radius:50px;
	text-align:center;
	box-shadow: 2px 2px 3px #999;
	border: none;
	&:hover {
		cursor: pointer;
	}
`

const Main = () => {
	return (
		<Router>
			<StyledMain>
				<Sidebar />
				<StyledSection>
				<Switch>
					<Route path="/home" component={Feed} />
					<Route path="/profile" component={Profile} />
					<Route path="/donation" component={Donation} />
					<Route path="/request" component={Request} />
					<Route path="/avail" component={Avail} />
				</Switch>
				</StyledSection>
				{/* <StyledFab /> */}
				<PostButton/>
			</StyledMain>
		</Router>
	)
}

export default Main