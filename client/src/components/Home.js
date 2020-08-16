import React from 'react'
import { Box } from '@chakra-ui/core'
import SectionHeader from './SectionHeader.js'
import Feed from './Feed.js'
import {FaHome} from 'react-icons/fa'

const Home = () => {
	return (
		<Box>
			{/* Section Header */}
      <SectionHeader title="Home" icon={FaHome}/>
      {/* Feed */}
      <Feed />
    </Box>
	)
}

export default Home