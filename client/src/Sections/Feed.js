import React, {useEffect, useState} from 'react'
import Card from '../components/home/Card.js';
import styled from 'styled-components'

import axios from 'axios';

const StyledFeed = styled.div`
	padding: 20px 30px;
`

const Feed = () => {
	
	return (
		<StyledFeed>
			<Card 
				avatar="{MarcoPic}" 
				title="I need alcohol pls guys"
				author="Marco Mirandilla"
				type="request"
				status="fulfilled"
				content="hahahaha"
				items="4"
			/>
		</StyledFeed>
	)
}

export default Feed