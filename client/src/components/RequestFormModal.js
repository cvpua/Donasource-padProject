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
import RequestFormContainer from './RequestFormContainer.js'


const RequestFormModal = (props) => {
	const { isOpen, onClose, postId, items } = props
	const [isSubmitting, setIsSubmitting] = useState(false)

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Request</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Comment Form */}
          <RequestFormContainer onClose={onClose} handleIsSubmitting={setIsSubmitting} items={items} postId={postId} />
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={() => {
            onClose()
            setIsSubmitting(false)
          }}>
            Cancel
          </Button>
          <Button variantColor="cyan" type="submit" isLoading={isSubmitting} form="requestForm">Request</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
	)
}

export default RequestFormModal