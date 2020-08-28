import React,{ useState } from 'react'
import { 
  Box,
	Stack, 
	Spinner, 
	IconButton,
	Button, 
  Flex,
	useDisclosure, 
	Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, 
  Skeleton,
  Text,
} from '@chakra-ui/core'
import { BiMeh } from 'react-icons/bi'
import Post from './Post.js'
import PostFormContainer from './PostFormContainer.js'


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
        posts.length === 0 ? 
          <Flex align="center" py="4" flexDirection="column">
            <Box as={BiMeh} size="32" />
            <Text>Oooops! Your feed is empty. Make a post now!</Text>
          </Flex>
        : 
          <Stack px="5" >
            {
              posts.map((post) => (
                <Post key={post._id} data={post} isLinked={true} isLoading={isLoading} />
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
    		pos="fixed" 
    		bottom={{base: "4.5rem", md: "8"}}
        icon="add" 
    		right={{base: "6", md: "8"}} 
        isRound
    		variant="solid"
    		variantColor="secondary"
    		aria-label="Post"
    		shadow="md"
    		size="lg"
    		onClick={onOpen}
    	/>
    </>
	)
}

export default Feed