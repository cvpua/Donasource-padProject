import React from 'react'
import Item from './Item.js'
import { Box, List, Text } from '@chakra-ui/core'

const ItemList = (props) => {
	const { items } = props	

	return (
		<Box shadow="outline" p="4">
      <Text>Need:</Text>
      <List spacing={3} ml="2">
      	{/* Item */}
        {
        	items.map((item,i) => (
        		<Item key={i} item={item} />
        	))
        }
      </List>
    </Box>
	)
}

export default ItemList