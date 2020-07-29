import React from 'react'
import Card from '../components/home/Card.js';
import styled from 'styled-components'
import MarcoPic from '../assets/dp.jpg'

const StyledFeed = styled.div`
	padding: 20px 30px;
`

const Feed = () => {
	return (
		<StyledFeed>
			<Card 
				avatar={MarcoPic} 
				title="I need alcohol pls guys"
				author="Marco Mirandilla"
				type="request"
				status="fulfilled"
				content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur auctor orci neque, vitae condimentum felis tincidunt non. Nulla commodo urna ac neque bibendum, sed convallis odio faucibus. Mauris accumsan ornare augue, ut porttitor lacus condimentum ut. Vestibulum consequat enim sit amet leo faucibus iaculis. Nam vehicula rutrum dui nec euismod. Curabitur eu interdum justo. Praesent malesuada, elit eu eleifend maximus, lorem purus molestie magna, sed blandit quam justo sed odio. Nulla varius finibus posuere. Vestibulum a turpis sed sem varius cursus sed vitae justo. Ut euismod erat neque."
				items="4"
			/>
		</StyledFeed>
	)
}

export default Feed