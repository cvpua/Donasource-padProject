import React from 'react'
import styled from 'styled-components'
import {Avatar, Badge, Button, Duration, Items, Name, Title } from '../home'


const StyledCard = styled.div`
	width: 950px;
	background-color: #FFF;
	box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
`

const StyledCardHeader = styled.div`
	display: flex;
	height: 100px;
	background-image: linear-gradient(#00A896, #028090);
	align-items: center;
	justify-content: space-between;
	padding: 0px 20px;
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
	padding: 20px 30px;
`

const StyledCardContent = styled.div`
	display: flex;
	padding-bottom: 20px;
	justify-content: space-between;
	min-height: 60px;
`

const StyledCardAction = styled.div`
	display: flex;
	justify-content: space-evenly;
`

const StyledDetails = styled.div`
	width: 75%;
`

const Card = ({avatar,title,author,type,status,content,items}) => {
	return (
		<StyledCard>
			<StyledCardHeader>
				<StyledAvatar>
					<Avatar src={avatar}/>
					<StyledCardInfo>
						<StyledTitle>
							<Title title={title} />
							<Duration duration={2}/>
						</StyledTitle>
						<Name name={author} />
					</StyledCardInfo>
				</StyledAvatar>
				<StyledCardBadge>
					<Badge type name={type}/>
					<Badge name={status}/>
				</StyledCardBadge>
			</StyledCardHeader>
			<StyledCardMain>
				<StyledCardContent>
					<StyledDetails>
						{content}
					</StyledDetails>
					<Items />
				</StyledCardContent>
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