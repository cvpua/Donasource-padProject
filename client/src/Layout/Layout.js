import React,{useState} from 'react'
import {
	Header,Container,Sidebar,
	Middle,Fab,PostForm,Ads
} from './index.js'

const Layout = (props) => {
	
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
			</Container>
		</React.Fragment>
	)
}

export default Layout