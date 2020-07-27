import React from 'react'
import Header from './Header.js'

const Layout = (props) => {
	return (
		<div>
			<Header title="Donasource"/>
			{props.children}
		</div>
	)
}

export default Layout