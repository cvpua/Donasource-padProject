import React from 'react'
import { ListItem, ListIcon, Badge } from '@chakra-ui/core'

const Item = (props) => {
	const { item, type } = props
	const { name, amount, total } = item
	const remaining = total - amount
	const isCompleted = remaining === 0 ? true : false

	return (
		<ListItem d="flex" alignItems="center">
			{/* Item Icon - will display check-circle if completed, else it will display warning */}
			{
				type === "request" ?
					isCompleted ? 
						<ListIcon icon="check-circle" color="green.500" />
					: 
						<ListIcon icon="warning" color="orange.500" />
				: amount === 0 ?
					<ListIcon icon="check-circle" color="green.500" />
				:
					<ListIcon icon="warning" color="orange.500" />
			}
    	{/* Item Name	*/}
      { name }      
    	{/* will be color green if completed, else color orange */}
    	{
    		type === "request" ? 
    			<Badge 
		      	variantColor={isCompleted ? "green" : "orange"} 
		      	ml="2"
		      >
			    	{/* Item Amount */}
			      { amount } / 
			    	{/* Item Total */}
			      { total }
		      </Badge>
		    : 
		    	<Badge 
		      	variantColor={amount === 0 ? "green" : "orange"} 
		      	ml="2"
		      >
			    	{`${amount} left`} 
		      </Badge>
    	}
    </ListItem>
	)
}

export default Item