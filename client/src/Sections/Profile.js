import React,{useState} from 'react'
import UserProfile from "../components/profile/user/UserProfile";
import SectionHeader from '../components/home/SectionHeader.js'
import styled from 'styled-components'
import theme from '../components/home/theme.js'
import Avatar from '../components/home/Avatar.js'
import Jeff from '../assets/Jeff.jpg'
import Typography from '../components/home/Typography.js'
import Feed from '../Sections/Feed.js'


const Profile = () => {

	return (
		<React.Fragment>
			<div>
				<UserProfile>
					<Feed />		
				</UserProfile>
			{/*	<Feed />*/}
			
			</div>
		</React.Fragment>
	)
}

export default Profile