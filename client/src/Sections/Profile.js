import React,{useState} from 'react'
import UserProfile from "../components/profile/user/UserProfile";
import SectionHeader from '../components/home/SectionHeader.js'
import styled from 'styled-components'
import theme from '../components/home/theme.js'
import Avatar from '../components/home/Avatar.js'
import Jeff from '../assets/Jeff.jpg'
import Typography from '../components/home/Typography.js'
import Feed from '../Sections/Feed.js'

const AboveProfile = styled.div`
	border-bottom: 1px solid ${theme.color.gainsboro};
`

const ProfileHeader = styled.div`
	background-image: linear-gradient(to right, #028090, #02C39A);
	display: flex;
	align-items: center;
	padding: ${theme.spacing(4)};
`

const UserInfo = styled.div`
`

const ProfileInfo = styled.div`
	
`

const Element = styled.div`
	padding-bottom: ${props => props.bottom};
	padding-right: ${props => props.right};
`

const Info = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
`

const Bio = styled.div`
	text-align: center;
`

const INIT_STATE = {
  id: "sample1",
  username: "user1",
  photo: Jeff,
  name: {
    fname: "Jeff Emerson",
    lname: "Lar",
  },
  location: "Los Banos, Laguna",
  email: "idcruz@up.edu.ph",
  contact: "09487621698",
  donations: 56,
  requests: 40,
  bio: "Iskolar ng Bayan || YSES || ELBI || tarashot || boss mapagmahalzxczxczxczxcz",
  edit: false,
}; 

const Profile = () => {
	const [user, setUser] = useState(INIT_STATE)

	return (
		<React.Fragment>
			<div>
				<AboveProfile>
					<ProfileHeader>
						<Element right={theme.spacing(3)}>
							<Avatar src={user.photo} size="150px"/>
						</Element>
						<ProfileInfo>
							<Element bottom={theme.spacing(2)}>
								<Typography variant="h2" weight={900} color={theme.color.beige}>
									{user.name.fname + " " + user.name.lname}
								</Typography>
								<Typography variant="h4" color={theme.color.beige}>
									@{user.username}
								</Typography>
							</Element>
							<Info>
								<Typography color={theme.color.beige}>
									| Donations Given: {user.donations} <br />
									| Donations Requested: {user.requests}
								</Typography>
							</Info>
						</ProfileInfo>
					</ProfileHeader>
					<Info>
						<Typography>{user.location}</Typography>
							<Typography>{user.email}</Typography>
							<Typography>{user.contact}</Typography>
					</Info>
					<Bio>
						<Typography>
							{user.bio}
						</Typography>
					</Bio>
					{/*<Bio />*/}
				</AboveProfile>
			{/*	<Feed />*/}
			<Feed />
			</div>
		</React.Fragment>
	)
}

export default Profile