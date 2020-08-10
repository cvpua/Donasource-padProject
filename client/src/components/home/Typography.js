import React from 'react'
import styled,{css} from 'styled-components'
import 'typeface-lato'
import 'typeface-raleway'
import theme from './theme.js'

const MainStyle = css`
	font-family: Lato;
	margin: 0;
	padding: 0;
`

const Styledh1 = styled.h1`
	${MainStyle}
`
const Styledh2 = styled.h2`
	${MainStyle}
`
const Styledh3 = styled.h3`
	${MainStyle}
`
const Styledh4 = styled.h4`
	${MainStyle}
`
const Styledh5 = styled.h5`
	${MainStyle}
`
const Styledh6 = styled.h6`
	${MainStyle}
`
const Styledp = styled.p`
	${MainStyle}
`
const ButtonText = styled.p`
	font-family: Raleway;
	margin: 0;
	padding: 0;
`

const Typography = (props) => {
	const styles = {
		color: props.color,
		fontWeight: props.weight,
	}

	return (
		{
			'h1': <Styledh1 style={styles}>{props.children}</Styledh1>,
			'h2': <Styledh2 style={styles}>{props.children}</Styledh2>,
			'h3': <Styledh3 style={styles}>{props.children}</Styledh3>,
			'h4': <Styledh4 style={styles}>{props.children}</Styledh4>,
			'h5': <Styledh5 style={styles}>{props.children}</Styledh5>,
			'h6': <Styledh6 style={styles}>{props.children}</Styledh6>,
			'body': <Styledp style={styles}>{props.children}</Styledp>,
			'button-text': <ButtonText style={{fontWeight: props.weight}}>{props.children}</ButtonText>,
		}[props.variant]
	)
}

Typography.defaultProps = {
	variant: "body",
	color: theme.color.dimGray,
	weight: 500,
}

export default Typography
