import React, { useState } from 'react'
import { 
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
  Button
} from '@chakra-ui/core'
import DonateFormContainer from './DonateFormContainer.js'

const DonateFormModal = (props) => {
	const { 
		isOpen, 
		onClose, 
		items, 
		donate, 
		postId 
	} = props

	const [isSubmitting, setIsSubmitting] = useState(false)

	return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Donate</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Comment Form */}
          <DonateFormContainer onClose={onClose} handleIsSubmitting={setIsSubmitting} items={items} donate={donate} postId={postId} />
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={() => {
            onClose()
            setIsSubmitting(false)
          }}>
            Cancel
          </Button>
          <Button variantColor="cyan" type="submit" isLoading={isSubmitting} form="donateForm">Donate</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
	)
}

export default DonateFormModal