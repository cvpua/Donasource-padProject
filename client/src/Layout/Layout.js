import React,{useState} from 'react'
import {
	Header,Container,Sidebar,
	Middle,Fab,PostForm,Ads
} from './index.js'

const Layout = (props) => {
	// this state changes when the user clicked the fab and the close button on the Post Form
	const [open, setOpen] = useState(false)
	
	return (
		<React.Fragment>
			<Header title="Donasource" />
			<Container>

				{/* First Column */}
				<Sidebar />
				{/* Second Column */}
				<Middle>
					{/* Sections will appear here */}
					{props.children}
				</Middle>
				{/* Third Column*/}
				<Ads flexGrow={1}>
					Ads
				</Ads>

				{/*Floating Action Button/ Post Button */}
				<Fab onClick={() => setOpen(true)}>
					<div>
						<span id="post-button">&#43;</span>
					</div>
				</Fab>
				{/* PostForm - Appears when the fab is clicked */}
				<PostForm open={open} handleClose={() => setOpen(false)} />
			</Container>
		</React.Fragment>
	)
}

export default Layout