import React from 'react'
import { Box } from '@chakra-ui/core'

const Left = (props) => {
	return (
		<Box 
      d={{base: "none", md:"flex"}} 
      w={{lg: "xs"}}
      h="100vh" 
      flexGrow={{base: 0, md: 1, lg: "0"}} 
      maxW="xs"  
      position="sticky"
      top="0" 
      borderRight="4px"
      color="gray.400"
      flexDirection="column"
      justifyContent="space-between"
      px="10"
      pt="6"
      pb="20"
    >
    	{props.children}
    </Box>
	)
}

export default Left