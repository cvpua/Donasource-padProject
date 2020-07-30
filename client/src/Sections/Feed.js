import React,{ useState,useEffect } from 'react'
import Card from '../components/home/Card.js';
import styled from 'styled-components'
import MarcoPic from '../assets/dp.jpg'

const StyledFeed = styled.div`
`
// For testing purposes
const INITIAL_STATE = [
	{
		avatar: MarcoPic,
		title: "I need alcohol pls guys",
		author: "Marco Mirandilla",
		type: "request",
		status: "fulfilled",
		content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur auctor orci neque, vitae condimentum felis tincidunt non. Nulla commodo urna ac neque bibendum, sed convallis odio faucibus. Mauris accumsan ornare augue, ut porttitor lacus condimentum ut. Vestibulum consequat enim sit amet leo faucibus iaculis. Nam vehicula rutrum dui nec euismod. Curabitur eu interdum justo. Praesent malesuada, elit eu eleifend maximus, lorem purus molestie magna, sed blandit quam justo sed odio. Nulla varius finibus posuere. Vestibulum a turpis sed sem varius cursus sed vitae justo. Ut euismod erat neque.",
		items: "4",
	},
	{
		avatar: MarcoPic,
		title: "I need alcohol pls guys",
		author: "Marco Mirandilla",
		type: "request",
		status: "fulfilled",
		content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur auctor orci neque, vitae condimentum felis tincidunt non. Nulla commodo urna ac neque bibendum, sed convallis odio faucibus. Mauris accumsan ornare augue, ut porttitor lacus condimentum ut. Vestibulum consequat enim sit amet leo faucibus iaculis. Nam vehicula rutrum dui nec euismod. Curabitur eu interdum justo. Praesent malesuada, elit eu eleifend maximus, lorem purus molestie magna, sed blandit quam justo sed odio. Nulla varius finibus posuere. Vestibulum a turpis sed sem varius cursus sed vitae justo. Ut euismod erat neque.",
		items: "4",
	},
	{
		avatar: MarcoPic,
		title: "I need alcohol pls guys",
		author: "Marco Mirandilla",
		type: "request",
		status: "fulfilled",
		content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur auctor orci neque, vitae condimentum felis tincidunt non. Nulla commodo urna ac neque bibendum, sed convallis odio faucibus. Mauris accumsan ornare augue, ut porttitor lacus condimentum ut. Vestibulum consequat enim sit amet leo faucibus iaculis. Nam vehicula rutrum dui nec euismod. Curabitur eu interdum justo. Praesent malesuada, elit eu eleifend maximus, lorem purus molestie magna, sed blandit quam justo sed odio. Nulla varius finibus posuere. Vestibulum a turpis sed sem varius cursus sed vitae justo. Ut euismod erat neque.",
		items: "4",
	},

]

const Feed = () => {
	const [posts, setPosts] = useState(INITIAL_STATE)

	// useEffect(() => {
 //    const fetchData = async () => {
 //      try{
 //        const { data } = await api.getAllPosts()
 //        setPosts(data)
 //      }catch(error){
 //        alert(error.response.data.data.message)
 //      }
 //    }
 //    fetchData()
 //  }, [])

	return (
		<StyledFeed>
			{posts.map((post) => (
				<Card 
					avatar={post.avatar} 
					title={post.title}
					author={post.author}
					type={post.type}
					status={post.status}
					content={post.content}	
					items={post.items}
				/>
			))}
	{/*		<Card 
				avatar={MarcoPic} 
				title="I need alcohol pls guys"
				author="Marco Mirandilla"
				type="request"
				status="fulfilled"
				content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur auctor orci neque, vitae condimentum felis tincidunt non. Nulla commodo urna ac neque bibendum, sed convallis odio faucibus. Mauris accumsan ornare augue, ut porttitor lacus condimentum ut. Vestibulum consequat enim sit amet leo faucibus iaculis. Nam vehicula rutrum dui nec euismod. Curabitur eu interdum justo. Praesent malesuada, elit eu eleifend maximus, lorem purus molestie magna, sed blandit quam justo sed odio. Nulla varius finibus posuere. Vestibulum a turpis sed sem varius cursus sed vitae justo. Ut euismod erat neque."
				items="4"
			/>*/}
		</StyledFeed>
	)
}

export default Feed