import React,{useState} from 'react'
import styled from 'styled-components'
import Header from './Header.js'
import SideBar from './SideBar.js'
import Ads from './Ads.js'
import Container from './Container.js'
import Navigation from './Navigation.js'
import Link from './Link.js'
import Fab from './Fab.js'
import PostForm from '../components/home/PostForm.js'
import {FaBell,FaList,FaUserAlt,FaHome} from 'react-icons/fa'
import {BrowserRouter as Router} from 'react-router-dom'
import {Feed, Notification, Avail, Profile} from '../Sections'
import Typography from '../components/home/Typography.js'
import theme from '../components/home/theme.js'
import Middle from './Middle.js'

const StyledIcon = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 20px;
	@media (min-width: 750px)	{
		padding-right: 20px;
	}
`

const Text = styled.div`
	display: none;
	@media (min-width: 750px)	{
		display: block;
	}
`


const Layout = (props) => {
	const [open, setOpen] = useState(false)

	return (
		<React.Fragment>
			<Header title="Donasource" />
			<Container>
				{/* First Column*/}
				<SideBar flexGrow={1}>
					<Navigation>
						<Link to="/home">
							<StyledIcon><FaHome /></StyledIcon>
							<Text>
								<Typography variant="button-text">Home</Typography>
							</Text>
						</Link>
						<Link to="/notification">
							<StyledIcon><FaBell /></StyledIcon>
							<Text>
								<Typography variant="button-text">Notification</Typography>
							</Text>
						</Link>
						<Link to="/avail">
							<StyledIcon><FaList/></StyledIcon>
							<Text>
								<Typography variant="button-text">Avails</Typography>
							</Text>
						</Link>
						<Link to="/profile">
							<StyledIcon><FaUserAlt/></StyledIcon>
							<Text>
								<Typography variant="button-text">Profile</Typography>
							</Text>
						</Link>
					</Navigation>
				</SideBar>
			{/* Second Column*/}
				<Middle>
					{props.children}
					<Fab onClick={() => {
							setOpen(true)
							console.log(open)
						}}>
							<div>
								<span id="post-button">&#43;</span>
							</div>
					</Fab>
					<PostForm open={open} handleClose={() => setOpen(false)}/>
				</Middle>
			{/* Third Column*/}
				<Ads flexGrow={1}>
					Ads
				</Ads>
			</Container>
		</React.Fragment>
	)
}

export default Layout