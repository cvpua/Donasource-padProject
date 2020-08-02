import React from 'react'
import styled from 'styled-components'
import {
	Avatar, Badge, Button, 
	Duration, Items, theme, 
	Typography 
} from '../home'
import {FaDonate,FaCommentDots,FaHeart} from 'react-icons/fa'

const StyledCard = styled.div`
	background-color: ${theme.color.white};
	box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
	border-radius: ${theme.spacing(1)};
	margin-top: 10px;
`

const StyledCardHeader = styled.div`
	display: flex;
	min-height: 70px;
	align-items: center;
	justify-content: space-between;
	padding: 20px 20px;
	border-bottom: 1px solid #DDD;
	border-top-left-radius: ${theme.spacing(1)};
	border-top-right-radius: ${theme.spacing(1)};
	background-image: linear-gradient(to right, #028090, #02C39A);
`

const StyledCardInfo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-left: 15px;
	max-width: 350px;
`

const StyledAvatar = styled.div`
	display: flex;
	overflow-wrap: break-word;
`

const StyledTitle = styled.div`
	display: flex;
	max-width: 200px;
	overflow: auto;
`

const StyledCardBadge = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
`

const StyledCardMain = styled.div`
	padding: 20px 20px 10px 20px;
`

const StyledCardContent = styled.div`
	display: flex;
	padding-bottom: 20px;
	justify-content: space-between;
`

const StyledCardAction = styled.div`
	display: flex;
	justify-content: space-evenly;
	padding-top: 5px;
	border-top: 1px solid ${theme.color.gainsboro};
`

const StyledDetails = styled.div`
`

const Card = ({avatar,title,author,type,description}) => {
	return (
		<StyledCard>
			<StyledCardHeader>
				<StyledAvatar>
					<Avatar src={avatar}/>
					<StyledCardInfo>
							<Typography variant="h4" weight={700} color={theme.color.beige}>
								{title}
							</Typography>
							<Typography variant="h5" color={theme.color.white}>
								{author}
							</Typography>
					</StyledCardInfo>
				</StyledAvatar>
				<Duration duration={2}/>
			</StyledCardHeader>
			<StyledCardMain>
				<StyledCardContent>
					<StyledDetails>
						<Typography color={theme.color.jetBlack}>
							{description}
						</Typography>
					</StyledDetails>
				</StyledCardContent>
				{/*<Items />*/}
				<StyledCardAction>
					<Button name="donate">
						<FaDonate/>
					</Button> 
					<Button name="comment">
						<FaCommentDots/>
					</Button>
					<Button name= "like">
						<FaHeart/>
					</Button>
				</StyledCardAction>
			</StyledCardMain>
		</StyledCard>
	)
}

export default Card