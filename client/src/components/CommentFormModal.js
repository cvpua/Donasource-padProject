import React, { useState } from 'react'
import { 
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Button,
} from '@chakra-ui/core'
import CommentFormContainer from './CommentFormContainer.js'

const CommentFormModal = (props) => {
	const { 
		isOpen, 
		onClose, 
		addComment, 
		postId 
	} = props

	const [isSubmitting, setIsSubmitting] = useState(false)

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
      	<ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Comment Form */}
          <CommentFormContainer onClose={onClose} handleIsSubmitting={setIsSubmitting} addComment={addComment} postId={postId} />
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={() => {
            onClose()
            setIsSubmitting(false)
          }}>
            Cancel
          </Button>
          <Button variantColor="cyan" type="submit" isLoading={isSubmitting} form="commentForm">Comment</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
	)
}

export default CommentFormModal