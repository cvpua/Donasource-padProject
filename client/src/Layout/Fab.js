import styled from 'styled-components'
import React from 'react'
import theme from '../components/home/theme.js'

const Fab = styled.button`
	position:fixed;
	width:50px;
	height:50px;
	bottom:30px;
	right:30px;
	background-color: ${theme.color.paleSpringBud};
	color: ${theme.color.persianGreen};
	font-weight: 700;
	font-size: 40px;
	border-radius:50px;
	box-shadow: 2px 2px 3px #999;
	border: none;
	display: flex;
	justify-content: center;
	align-items: center;
	&:hover {
		cursor: pointer;
	}
`

export default Fab


