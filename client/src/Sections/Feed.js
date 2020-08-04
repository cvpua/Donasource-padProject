import React,{ useContext } from 'react'
import Card from '../components/home/Card.js';
import styled from 'styled-components'
import MarcoPic from '../assets/dp.jpg'
import Typography from '../components/home/Typography.js'
import theme from '../components/home/theme.js'
import {FeedContext} from '../App.js'
import SectionHeader from '../components/home/SectionHeader.js'

const StyledFeed = styled.div`
	padding: 10px;
`

const Feed = () => {
	const {posts} = useContext(FeedContext)

	return (
		<React.Fragment>
			<StyledFeed>
				{posts.map((post) => (
					<Card 
						avatar={post.avatar} 
						title={post.title}
						author={post.author}
						type={post.type}
						status={post.status}
						description={post.description}	
						items={post.items}
					/>
				))}
			</StyledFeed>
		</React.Fragment>
	)
}

export default Feed