import React from 'react'
import { ListItem, ListIcon, Badge } from '@chakra-ui/core'

const Item = (props) => {
	const { item } = props
	const { name, amount, total } = item
	const remaining = total - amount
	const isCompleted = remaining === 0 ? true : false

	return (
		<ListItem d="flex" alignItems="center">
			{/* Item Icon - will display check-circle if completed, else it will display warning */}
			{
				isCompleted 
				? <ListIcon icon="check-circle" color="green.500" />
				: <ListIcon icon="warning" color="orange.500" />
			}
    	{/* Item Name	*/}
      { name }      
    	{/* will be color green if completed, else color orange */}
      <Badge 
      	variantColor={isCompleted ? "green" : "orange"} 
      	ml="2"
      >
	    	{/* Item Amount */}
	      { amount } / 
	    	{/* Item Total */}
	      { total }
      </Badge>
    </ListItem>
	)
}

export default Item