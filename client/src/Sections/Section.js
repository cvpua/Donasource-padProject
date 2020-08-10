import React from 'react'
import SectionHeader from '../components/home/SectionHeader.js'

const Section = (props) => {
	return (
		<div>
			<SectionHeader title={props.title} />
			{props.children}
		</div>
	)
}

export default Section