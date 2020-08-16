import React,{ useState,useEffect,useContext } from 'react'
import {Link} from 'react-router-dom'
import CardPost from '../components/home/CardPost.js';
import styled from 'styled-components'
import Fab from '../components/home/Fab.js'
import PostForm from '../components/home/form/PostForm.js'
import MarcoPic from '../assets/dp.jpg'
import axios from 'axios'
import UserContext from '../App.js'

const POST = {
	id: 1,
  avatar: MarcoPic,
  title: "I need alcohol pls guys",
  author: "Marco Mirandilla",
  type: "request",
  status: "fulfilled",
  description: 
  items: [{
    name: "Alcohol",
    amount: 2,
    total: 4
    description: ,
    image: ,
  },],
  tags: ['Educational','Food'],
  datePosted: ,
  deadline: ,
  location: ,
}

const StyledFeed = styled.div`
	padding: 10px;
`

const Feed = () => {

	const [posts, setPosts] = useState([])
	
	// this state changes when the user clicked the fab and the close button on the Post Form
	const [open, setOpen] = useState(false)
	const [loading, setLoading] = useState(true)

	const addPost = (data) => {
		setPosts(prevState => (
		  [
		    ...prevState,
		    data,
		  ]
		))
	}

	useEffect(() => {
     const fetchData = async () => {
       try{
        	const { data } = await axios.get('/api/posts')
        	setPosts(data)
  				setLoading(false)
       }catch(error){
         alert(error)
       }
     }
     fetchData()
   }, [])

	return (
		<React.Fragment>
			<StyledFeed>
				{posts.map((post) => (
						<CardPost
							key={post._id} 
							avatar={POST.avatar} 
							title={post.title}
							author={post.author}
							type={POST.type}
							status={post.status}
							description={post.description}	
							items={POST.items}
							tags={post.tags}
							isLiked={true}
							link ={`/profile/post/${post._id}`}
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