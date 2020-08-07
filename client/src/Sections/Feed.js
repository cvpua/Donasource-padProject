import React,{ useState } from 'react'
import {Link} from 'react-router-dom'
import CardPost from '../components/home/CardPost.js';
import styled from 'styled-components'
import Fab from '../components/home/Fab.js'
import PostForm from '../components/home/form/PostForm.js'
import MarcoPic from '../assets/dp.jpg'

const INITIAL_STATE = [
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
  },
]

const StyledFeed = styled.div`
	padding: 10px;
`

const Feed = () => {
	const [posts, setPosts] = useState(INITIAL_STATE)
	
	// this state changes when the user clicked the fab and the close button on the Post Form
	const [open, setOpen] = useState(false)

	const addPost = (data) => {
		const newPost = {
		  ...data,
		  avatar: MarcoPic,
		  author: "Marco Mirandilla"
		}
		setPosts(prevState => (
		  [
		    ...prevState,
		    newPost,
		  ]
		))
	}

	// const [loading, setLoading] = useState(true)
	// useEffect(() => {
  //    const fetchData = async () => {
  //      try{
  //        const { data } = await api.getAllPosts()
  //        setPosts(data)
  //				setLoading(false)
  //      }catch(error){
  //        alert(error.response.data.data.message)
  //      }
  //    }
  //    fetchData()
  //  }, [])

	return (
		<React.Fragment>
			<StyledFeed>
				{posts.map((post) => (
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
							link ={`/profile/post/${post.id}`}
						/>
				))}
			</StyledFeed>
			{/*Floating Action Button/ Post Button */}
			<Fab onClick={() => setOpen(true)}>
				<div>
					<span id="post-button">&#43;</span>
				</div>
			</Fab>
			{/* PostForm - Appears when the fab is clicked */}
			<PostForm open={open} handleClose={() => setOpen(false)} addPost={addPost} />
		</React.Fragment>
	)
}

export default Feed