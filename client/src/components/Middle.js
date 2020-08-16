import React from 'react'
import { Box } from '@chakra-ui/core'

const Middle = (props) => {
	return (
		<Box 
      w={{md: "xl"}} 
      minW="xs" 
      maxW="xl" 
      flexGrow={{base: "1", md: "0"}}
    >
    	{ props.children }
    </Box>
	)
}

export default Middle