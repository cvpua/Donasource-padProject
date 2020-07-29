import React,{useState} from 'react'
import Sidebar from './Sidebar.js'
import styled from 'styled-components'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Feed,Profile,Donation,Request,Avail} from '../Sections'
import UserProfile from '../components/profile/user/UserProfile.js'
import PostButton from '../components/post-component/PostButton.js'
import PostForm from '../components/home/PostForm.js'

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
	background-color:#F0F3BD;
	color:#FFF;
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
				{/*<PostButton />*/}
				<StyledFab onClick={() => setOpen(true)}>
					<div>
					<span id="post-button">&#43;</span>
					</div>
				</StyledFab>
				<PostForm open={open} />
			</StyledMain>
		</Router>
	)
}

export default Main