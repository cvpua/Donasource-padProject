import React,{ useState } from 'react';
import styled from 'styled-components'
import Typography from '../components/home/Typography.js'
import theme from '../components/home/theme.js'
import Avatar from '../components/home/Avatar.js'
import MarcoPic from '../assets/dp.jpg'

const INITIAL_STATE = [{
	id: 1,
	avatar: MarcoPic,
	title: "I need alcohol pls guys",
},
]

const ProfileHeader = styled.div `
	border-bottom: 1px solid ${theme.color.gainsboro};	
	min-height: 150px;	
	: hover {
		background: white;
		cursor: pointer;
	}
`

const Element = styled.div `
	padding-bottom: ${props => props.bottom};
	padding-right: ${props => props.right};
	padding-left: ${props => props.left};
	padding-top: ${props => props.top};
`
//Multiple icon needs fix
const Notification = () => {
	const [posts] = useState(INITIAL_STATE)

	return (
		<React.Fragment>
			{posts.map((post) => (
				<ProfileHeader>	
					<Element left={theme.spacing(3)} top={theme.spacing(3)}>
						{/* Hindi nagana yung size idk why hahahah nagstrestretch siya need fix */}
						<Avatar src={post.avatar} size="30px"/>
					</Element>
					<Element top={theme.spacing(2)}left={theme.spacing(3)}>
						Jeff has donated on your request.
					</Element>
					<Element top={theme.spacing(2)}left={theme.spacing(3)}>
						<Typography>
							{post.title}
						</Typography>
					</Element>
				</ProfileHeader>
			))}
		</React.Fragment>
	)
}

export default Notification