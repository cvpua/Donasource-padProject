import React,{ useState } from 'react'
import PostHeader from './PostHeader.js'
import ItemList from './ItemList.js'
import Tags from './Tags.js'
import { 
  Box, 
  Flex, 
  IconButton, 
  Text, 
  PseudoBox, 
  useDisclosure, 
  Stack, 
  Avatar, 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalContent, 
  ModalOverlay, 
  ModalFooter, 
  ModalCloseButton, 
  Button
} from '@chakra-ui/core'
import { FaDonate, FaCommentDots, FaHeart } from 'react-icons/fa'
import LikeButton from './LikeButton.js'
import { Link } from 'react-router-dom'
import CommentFormContainer from './CommentFormContainer.js'

// For now, let this be a request type post

const Post = (props) => {
	const { data, addComment, isLinked } = props
	const {
    _id,
		avatar,
		title,
		author,
		deadline,
		description,
		items,
		tags,
    likers,
	} = data

  //  A custom hook to help handle common open, close, or toggle scenarios. 
  // See this docs for more information: https://chakra-ui.com/usedisclosure
  const { isOpen, onOpen, onClose } = useDisclosure()
  // Form modal will close if the form is successfully submitted
  const [isSubmitting, setIsSubmitting] = useState(false)

	return (
    <div>
  		<PseudoBox p="5" mb="4" shadow="sm" bg="white" rounded="lg" pos="relative" _hover={{ borderColor: "gray.200", bg: "gray.50" }}>
        {
          isLinked 
          ? <Box as={Link} to={`/profile/post/${_id}`} w="full" h="full" pos="absolute" top="0" left="0" bottom="0" right="0"></Box>
          : "" 
        }
        {/* Post Header */}
        <PostHeader
        	avatar={avatar} 
  				title={title} 
  				author={author} 
  				deadline={deadline}
        />
      	{/* Post Content */}
        <Box my="4">
          <Text>{description}</Text>
        </Box>
      	{/* Item List */}
        <ItemList items={items} />
      	{/* Tags */}
        <Tags tags={tags} />
        {/* Post Actions */}
        <Flex justify="space-around" borderTop="1px" borderColor="gray.200" py="2">
          {/* Donate Button */}
          <IconButton variant="ghost" isRound icon={FaDonate} />
          {/* Comment Button */}
          <IconButton variant="ghost" isRound icon={FaCommentDots} onClick={onOpen} />
          {/* Like Button  */}
          <LikeButton id={_id} likers={likers} />
        </Flex>
        {props.children}
      </PseudoBox>
      

      {/* Comment Form Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Comment Form */}
            <CommentFormContainer onClose={onClose} handleIsSubmitting={setIsSubmitting} addComment={addComment} postId={_id} />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variantColor="primary" type="submit" isLoading={isSubmitting} form="commentform">Comment</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
	)
}

export default Post