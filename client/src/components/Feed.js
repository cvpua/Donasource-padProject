import React,{ useState, useEffect } from 'react'
import axios from 'axios'
import { 
	Stack, 
	Spinner, 
	IconButton,
	Button, 
	useDisclosure, 
	Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, 
} from '@chakra-ui/core'
import Post from './Post.js'
import PostFormContainer from './PostFormContainer.js'
import MarcoPic from '../assets/dp.jpg'

// To do:
// Add Post Feature
//  [+] - Post Button
//  [+] - Post Form
//  [+] - addPost(post) (sa backend na lang)
//  []
// Add Skeleton for better user experience

// temporary initial state
const INIT_STATE = [{
		avatar: MarcoPic,
		author: 'Marco Mirandilla',
		title: 'Penge Ayuda',
		description: 'Wala lang',
		type: 'donation',
		location: 'Gumaca',
		deadline: new Date(),
		items: [{name: 'Watermelon', quantity: 10, amount: 0}],
		tags: ['Food'],
		images: null,
	}]

const Feed = (props) => {
	const { posts, createPost, isLoading } = props
	// Form modal will close if the form is successfully submitted
	const [isSubmitting, setIsSubmitting] = useState(false)
	//	A custom hook to help handle common open, close, or toggle scenarios. 
	// See this docs for more information: https://chakra-ui.com/usedisclosure
	const { isOpen, onOpen, onClose } = useDisclosure()

	
	
	return (
		<>
			{
				isLoading 
      	? <Spinner 
      			thickness="4px"
      			speed="0.65s" 
      			emptyColor="gray.200" 
      			color="blue.500" 
      			size="xl" 
      		/>
      	: <Stack px="5" >
		  			{
		    			posts.map((post,i) => (
		    				<Post key={i} data={post} id={i} isLinked={true} />
		    			))
		  			}
		  		</Stack>
			}
	    
	    {/* Post Form Modal */}
	    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          	{/* Post Form */}
            <PostFormContainer onClose={onClose} handleIsSubmitting={setIsSubmitting} createPost={createPost} />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variantColor="primary" type="submit" isLoading={isSubmitting} form="postform">Post</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

	    {/* Floating Action Button / Post Button */}
    	<IconButton 
    		icon="add" 
    		pos="fixed" 
    		bottom="8" 
    		right="8" 
    		isRound
    		variant="solid"
    		variantColor="cyan"
    		aria-label="Post"
    		shadow="md"
    		size="lg"
    		onClick={onOpen}
    	/>
    </>
	)
}

export default Feed