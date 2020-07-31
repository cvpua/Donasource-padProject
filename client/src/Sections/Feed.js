import React, {useEffect, useState} from 'react'
import Card from '../components/home/Card.js';
import styled from 'styled-components'
import axios from 'axios';

const StyledFeed = styled.div`
	padding: 20px 30px;
`

const Feed = () => {
	
	const [post,setPosts] = useState([])
	const [isLoading,setLoading] = useState(true)
	
	useEffect( () => {
		const fetchData = async () => {
			try{
				const {data} = await axios.get('/api/posts');
				setPosts(data);
				setLoading(false)
			}catch(e){
				alert(e);
			}
		}
		fetchData();
	},[])

	return (
		<StyledFeed>
			{/* <Card 
				avatar="{MarcoPic}" 
				title="I need alcohol pls guys"
				author="Marco Mirandilla"
				type="request"
				status="fulfilled"
				content="hahahaha"
				items="4"
			/> */}
		   {
		   isLoading ? 
		   		<div>Loading... </div> :
				post.map(post=>{
					return(
						<div key = {post.postId}>
							<Card
								avatar = {post.avatar} 
								title = {post.title}
								author = {post.author}
								postType = {post.request}
								status = {post.status}
								content = {post.content}
								items = {post.items}
							/>
						</div>
					)}
			)}
			
		</StyledFeed>
	)
}

export default Feed