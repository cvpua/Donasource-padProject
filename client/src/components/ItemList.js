import React from 'react'
import Item from './Item.js'
import { Box, List, Text } from '@chakra-ui/core'

const ItemList = (props) => {
	const { items, type } = props	

	return (
		<Box border="2px" rounded="lg" borderColor="cyan.400" p="4">
      <Text>
        {
          type === "request" ? "Need:"
          : "Giving:"
        }
      </Text>
      <List spacing={3} ml="2">
      	{/* Item */}
        {
        	items.map((item,i) => (
        		<Item key={i} item={item} type={type} />
        	))
        }
      </List>
      { props.children }
    </Box>
	)
}

export default ItemList