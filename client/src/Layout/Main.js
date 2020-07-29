import React,{useState} from 'react'
import Sidebar from './Sidebar.js'
import styled from 'styled-components'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Feed,Donation,Request,Avail} from '../Sections'
import UserProfile from '../components/profile/user/UserProfile.js'
import PostForm from '../components/home/PostForm.js'
import theme from '../components/home/theme.js';

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
	bottom:30px;
	right:30px;
	background-color: ${theme.color.paleSpringBud};
	color: ${theme.color.persianGreen};
	font-weight: 700;
	border-radius:50px;
	box-shadow: 2px 2px 3px #999;
	border: none;
	display: flex;
	justify-content: center;
	align-items: center;
	&:hover {
		cursor: pointer;
	}
`

const Main = () => {
	const [open, setOpen] = useState(false)

	return (
		<Router>
			<StyledMain>
				<Sidebar />
				<StyledSection>
				<Switch>
					<Route path="/home" component={Feed} />
					<Route path="/profile" component={UserProfile} />
					<Route path="/donation" component={Donation} />
					<Route path="/request" component={Request} />
					<Route path="/avail" component={Avail} />
				</Switch>
				</StyledSection>
				<StyledFab onClick={() => setOpen(true)}>
					<div>
					<span id="post-button">&#43;</span>
					</div>
				</StyledFab>
				<PostForm open={open} handleClose={() => setOpen(false)}/>
			</StyledMain>
		</Router>
	)
}

export default Main