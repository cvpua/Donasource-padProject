import React,{useState} from 'react'
import {
	Avatar, 
	Duration, Items, theme, 
	Typography 
} from '../home'
import {
	Card, CardAction, CardContent,
	CardHeader, CardInfo, CardMain,
	Info
} from './card'
import {Button,LikeButton} from './button'
import {FaDonate,FaCommentDots,FaHeart} from 'react-icons/fa'
import Tags from './Tags.js'
import styled from 'styled-components'
import CommentForm from './form/CommentForm.js'
import CommentButton from './button/CommentButton.js'
import {Link} from 'react-router-dom'

const CardDescription = styled.div`
	padding-bottom: 20px;
`

const CardExtra = styled.div`
`

const StyledCard = styled(Card)`
	position: relative;
`

const StyledLink = styled(Link)`
	position: absolute;
	left:0; top:0; bottom:0; right:0;
	z-index: 1;
`

const CardPost = (props) => {

	const {avatar,title,author,type,description,tags,items,isLiked,addComment} = props
	
	const [comment, setComment] = useState(false)

	const handleOpen = () => {
		setComment(!comment)
	}

	return (
		<>
		<StyledCard>
		<StyledLink to={props.link}>
		</StyledLink>
			<CardHeader>
				<CardInfo>
					<Avatar src={avatar}/>
					<Info>
						<Typography variant="h4" weight={700} color={theme.color.beige}>
							{title}
						</Typography>
						<Typography variant="h5" color={theme.color.white}>
							{author}
						</Typography>
					</Info>
				</CardInfo>
				<Duration duration={2}/>
			</CardHeader>
			<CardMain>
				<CardContent>
					<CardDescription>
						<Typography color={theme.color.jetBlack}>
							{description}
						</Typography>
					</CardDescription>
					<CardExtra>
						<Items items={items} />
						<Tags data={tags} />
					</CardExtra>
				</CardContent>
				<CardAction>
					<Button name="donate" >
						<FaDonate/>
					</Button> 
					<CommentButton name="comment" handleClick={handleOpen}>
						<FaCommentDots/>
					</CommentButton>
					<LikeButton name="like" isLiked={isLiked}>
						<FaHeart/>
					</LikeButton>
				</CardAction>
			</CardMain>
		</StyledCard>
		<CommentForm open={comment} handleClose={handleOpen} addComment={addComment}/>
		</>
	)
}

export default CardPost