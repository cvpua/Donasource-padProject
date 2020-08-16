import React from 'react'
import { Box } from '@chakra-ui/core'

const Right = (props) => {
	return (
		<Box 
      d={{base: "none", lg: "flex"}} 
      maxW="xs" 
      flexGrow={{base: "0", lg: "1"}} 
    >
    	{ props.children }
    </Box>
	)
}

export default Right