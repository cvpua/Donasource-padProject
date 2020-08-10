import React,{useState,useEffect} from 'react'
import CardPost from '../components/home/CardPost.js'
import MarcoPic from '../assets/dp.jpg'
import Jeff from '../assets/Jeff.jpg'
import SectionHeader from '../components/home/SectionHeader.js'
import {useParams} from 'react-router-dom'
import styled from 'styled-components'
import CardComment from '../components/home/CardComment.js'

// For testing purposes
const INITIAL_POST = 
  {
  	id: 1,
    avatar: MarcoPic,
    title: "I need alcohol pls guys",
    author: "Marco Mirandilla",
    type: "request",
    status: "fulfilled",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur auctor orci neque, vitae condimentum felis tincidunt non. Nulla commodo urna ac neque bibendum, sed convallis odio faucibus. Mauris accumsan ornare augue, ut porttitor lacus condimentum ut. Vestibulum consequat enim sit amet leo faucibus iaculis. Nam vehicula rutrum dui nec euismod. Curabitur eu interdum justo. Praesent malesuada, elit eu eleifend maximus, lorem purus molestie magna, sed blandit quam justo sed odio. Nulla varius finibus posuere. Vestibulum a turpis sed sem varius cursus sed vitae justo. Ut euismod erat neque.",
    items: [{
      name: "Alcohol",
      amount: 2,
      total: 4
    },],
    tags: ['Educational','Food'],
    isLiked: true,
  }

const INITIAL_COMMENTS = [
	{
		user: {
			avatar: Jeff,
			name: "Jeff Lar",
		},
		content: "What a dork!",
	},
]
const StyledPost = styled.div`
	padding: 10px;
`

const Post = ({match}) => {
	const { id } = useParams()

	const [loading, setLoading] = useState(false)
	const [post, setPost] = useState(INITIAL_POST)
	const [comments, setComments] = useState(INITIAL_COMMENTS)

	// useEffect(() => {
 //     const fetchData = async () => {
 //       	try{
 //         	const { data } = await api.getPostById(postId)
 //						const { comments } = await api.getCommentsByPostId(postId)
 //         	setPost(data)
 //						setComments(comments)
 //  					setLoading(false)
 //       	}catch(error){
 //         	alert(error.response.data.data.message)
 //       	}
 //     }
 //     fetchData()
 //   }, [postId])

 const addComment = (comment) => {
 	setComments(prevState => ([
 		...prevState,
 		comment
 	]))
 }

	return (
		<>
			<SectionHeader title="Post" />
			<StyledPost>
			{!loading && (
				<>
				<CardPost 
						avatar={post.avatar} 
						title={post.title}
						author={post.author}
						type={post.type}
						status={post.status}
						description={post.description}	
						items={post.items}
						tags={post.tags}
						isLiked={post.isLiked}
						addComment={addComment}
					/>
					{comments.map((comment) =>(
						<CardComment data={comment}/>
					))}
					</>
				)
			}
			</StyledPost>
		</>
	)
}

export default Post