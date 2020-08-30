import React, {useContext, useState, useEffect} from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import { Stack, Spinner, Flex } from '@chakra-ui/core'
import SectionHeader from './SectionHeader.js'
import Post from './Post.js'
import { PostContext } from './PostProvider.js'

const SearchSection = () => {
	const store = useContext(PostContext)
 	const { filteredPost } = store
 	const [filteredPosts] = filteredPost

 	const [isLoading, setIsLoading] = useState(false)

 	useEffect(() => {
 		setIsLoading(true)
 		setTimeout(() => {
 			setIsLoading(false)
 		}, 500)
 	}, [filteredPosts])

	return (
		<div>
			<SectionHeader title={`Search results:`} icon={BiSearchAlt} />
			{
				isLoading ? 
					<Flex justify="center" pt="8" >
						<Spinner
						  thickness="6px"
						  speed="0.65s"
						  emptyColor="gray.200"
						  color="primary.600"
						  size="xl"
						/>
					</Flex>
				: 
					<Stack mb={{base: "16", md: "4"}} px={{base: "0", sm: "4"}} >
		        {
		          filteredPosts.map((post) => (
		            <Post key={post._id} data={post} isLinked={true}/>
		          ))
		        }
		      </Stack>
			}
		</div>
	)
}

export default SearchSection