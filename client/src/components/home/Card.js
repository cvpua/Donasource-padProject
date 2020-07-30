import React from 'react'
import styled from 'styled-components'
import {
	Avatar, Badge, Button, 
	Duration, Items, theme, 
	Typography 
} from '../home'


const StyledCard = styled.div`
	width: ${theme.spacing(70)};
	min-height: ${theme.spacing(1)};
	background-color: ${theme.color.white};
	box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
	border-radius: ${theme.spacing(1)};
	margin: ${theme.spacing(3)};
`

const StyledCardHeader = styled.div`
	display: flex;
	height: 70px;
	align-items: center;
	justify-content: space-between;
	padding: 0px 20px;
	border-bottom: 1px solid #DDD;
`

const StyledCardInfo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-left: 15px;
`

const StyledAvatar = styled.div`
	display: flex;
`

const StyledTitle = styled.div`
	display: flex;
`

const StyledCardBadge = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	height: inherit;
`

const StyledCardMain = styled.div`
	padding: 20px 20px 10px 20px;
`

const StyledCardContent = styled.div`
	display: flex;
	padding-bottom: 20px;
	justify-content: space-between;
	min-height: 30px;
`

const StyledCardAction = styled.div`
	display: flex;
	justify-content: space-evenly;
`

const StyledDetails = styled.div`
`

const Card = ({avatar,title,author,type,status,content,items}) => {
	return (
		<StyledCard>
			<StyledCardHeader>
				<StyledAvatar>
					<Avatar src={avatar}/>
					<StyledCardInfo>
						<StyledTitle>
							<Typography variant="h3" weight={700} color={theme.color.jetBlack}>
								{title}
							</Typography>
							<Duration duration={2}/>
						</StyledTitle>
							<Typography variant="h5" color={theme.color.dimGray}>
								{author}
							</Typography>
					</StyledCardInfo>
				</StyledAvatar>
				<StyledCardBadge>
					<Badge type="type" name={type}/>
					<Badge type="status" name={status}/>
				</StyledCardBadge>
			</StyledCardHeader>
			<StyledCardMain>
				<StyledCardContent>
					<StyledDetails>
						<Typography color={theme.color.jetBlack}>
							{content}
						</Typography>
					</StyledDetails>
				</StyledCardContent>
				<Items />
				<StyledCardAction>
					<Button name="donate"/> 
					<Button name="see thread"/>
					<Button name= "like"/>
				</StyledCardAction>
			</StyledCardMain>
		</StyledCard>
	)
}

export default Card