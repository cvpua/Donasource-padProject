import React,{ useState, useEffect } from 'react'
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
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalContent, 
  ModalOverlay, 
  ModalFooter, 
  ModalCloseButton, 
  Button,
  Image,
  Stack,
  Grid,
} from '@chakra-ui/core'
import { BiDonateHeart, BiCommentDots} from 'react-icons/bi'
import LikeButton from './LikeButton.js'
import { Link } from 'react-router-dom'
import CommentFormContainer from './CommentFormContainer.js'
import DonateFormContainer from './DonateFormContainer.js'
import PostSkeleton from './PostSkeleton.js'

// For now, let this be a request type post

const Post = (props) => {
	const { data, addComment, isLinked, isLoading, isPostSection } = props
	const {
    _id,
		avatar,
		title,
		name,
		deadline,
		description,
		items: mainItems,
		tags,
    likers,
    status: mainStatus,
    images,
	} = data

  const author = name.firstName + " " + name.lastName

  //  A custom hook to help handle common open, close, or toggle scenarios. 
  // See this docs for more information: https://chakra-ui.com/usedisclosure
  const { isOpen: isOpenComment, onOpen: onOpenComment, onClose: onCloseComment } = useDisclosure()
  const { isOpen: isOpenDonate, onOpen: onOpenDonate, onClose: onCloseDonate } = useDisclosure()

  // Form modal will close if the form is successfully submitted
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [items, setItems] = useState([])
  const [status, setStatus] = useState('')

  const donate = (newItems) => {
    setItems(newItems)
    const isFulfilled = newItems.every((item) => ((item.total - item.amount) === 0 ? true : false))
    if (isFulfilled){
      setStatus("FULFILLED")
    }
  }

  useEffect(() => {
    setItems(mainItems)
    setStatus(mainStatus)
  }, [mainItems, mainStatus])

	return (
    <div>
      {
        isLoading ? <PostSkeleton />
        :
      		<PseudoBox p="5" pb="2" mb="4" bg="white" shadow="sm" rounded="lg" pos="relative" _hover={{ borderColor: "gray.200", bg: "gray.50" }}>
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
              status={status}
            />
          	{/* Post Content */}
            <Box my="4">
              <Text>{description}</Text>
            </Box>
          	{/* Item List */}
            <ItemList items={items}>
              {
                images && isPostSection ?
                  (images.map((image) => (
                    <Image src={image.image.url} w="full" h="64" mt="2" objectFit="cover" /> 
                  )))
                : images && images.length !== 0 ?
                  <Image src={images[0].image.url} w="full" h="64" mt="2" objectFit="cover" /> 
                : ""
              }
            </ItemList>
          	{/* Tags */}
            <Tags tags={tags} />
            {/* Images */}
            
            {/* Post Actions */}
            <Flex justify="space-around" borderTop="2px" borderColor="gray.300" pt="2">
              {/* Donate Button */}
              <IconButton isDisabled={status === "PENDING" ? false : true} size="lg" variant="ghost" isRound icon={BiDonateHeart} onClick={onOpenDonate} />
              {/* Comment Button */}
              <IconButton variant="ghost" size="lg" isRound icon={BiCommentDots} onClick={onOpenComment} />
              {/* Like Button  */}
              <LikeButton id={_id} likers={likers} />
            </Flex>
            {props.children}
          </PseudoBox>
      }
      {/* Donate Form Modal */}
      <Modal isOpen={isOpenDonate} onClose={onCloseDonate}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Donate</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Comment Form */}
            <DonateFormContainer onClose={onCloseDonate} handleIsSubmitting={setIsSubmitting} items={items} donate={donate} postId={_id} />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={() => {
              onCloseDonate()
              setIsSubmitting(false)
            }}>
              Cancel
            </Button>
            <Button variantColor="cyan" type="submit" isLoading={isSubmitting} form="donateform">Donate</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


      {/* Comment Form Modal */}
      <Modal isOpen={isOpenComment} onClose={onCloseComment}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Comment Form */}
            <CommentFormContainer onClose={onCloseComment} handleIsSubmitting={setIsSubmitting} addComment={addComment} postId={_id} />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={() => {
              onCloseComment()
              setIsSubmitting(false)
            }}>
              Cancel
            </Button>
            <Button variantColor="cyan" type="submit" isLoading={isSubmitting} form="commentform">Comment</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
	)
}

export default Post