import React from 'react'
import Card from './card/Card.js'
import CardHeader from './card/CardHeader.js'
import CardInfo from './card/CardInfo.js'
import CardMain from './card/CardMain.js'
import Info from './card/Info.js'
import Avatar from './Avatar.js'
import Typography from './Typography.js'
import theme from './theme.js'

const CardComment = ({data}) => {
	const {avatar,name} = data.user
	const {content} = data
	
	return (
		<Card>
			<CardHeader>
				<CardInfo>
					<Avatar src={avatar}/>
					<Info>
						<Typography variant="h4" weight={700} color={theme.color.beige}>
							{name}
						</Typography>
					</Info>
				</CardInfo>
			</CardHeader>
			<CardMain>
				<Typography>
					{content}
				</Typography>
			</CardMain>
		</Card>
	)
}

export default CardComment