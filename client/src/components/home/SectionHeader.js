import React from 'react'
import styled from 'styled-components'
import {Typography,theme} from './index.js'

const StyledSectionHeader = styled.div`
	padding: 15px 0 15px 20px;
	position: sticky;
	top: 0;
	border-bottom: 1px solid ${theme.color.gainsboro};
	background-color: #f0efeb;
`

const SectionHeader = (props) => {
	return(
		<StyledSectionHeader>
		  <Typography 
		    variant="h2" 
		    weight={900} 
		    color={theme.color.persianGreen}
		    >
		    {props.title}
		  </Typography>
		</StyledSectionHeader>
	)
}

export default SectionHeader