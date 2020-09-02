import React,{ useState, useEffect, useContext } from 'react'
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
  Button,
  Image,
  Stack,
  Grid,
} from '@chakra-ui/core'
import { BiDonateHeart, BiCommentDots, BiMessageAltEdit} from 'react-icons/bi'
import LikeButton from './LikeButton.js'
import { Link } from 'react-router-dom'
import PostSkeleton from './PostSkeleton.js'
import {UserContext} from '../App.js'
import CommentFormModal from './CommentFormModal.js'
import RequestFormModal from './RequestFormModal.js'
import DonateFormModal from './DonateFormModal.js'

const Post = (props) => {
	const { data, addComment, isLinked, isLoading, isPostSection } = props
	const {
    _id: postId,
    user,
    type,
		title,
		deadline,
		description,
		items: mainItems,
		tags,
    likers,
    status: mainStatus,
    images,
	} = data
  
  const{ _id: userId, name, username, avatar } = user;

  const author = name.firstName + " " + name.lastName

  const [USER] = useContext(UserContext)
  const { user: currentUser } = USER
  const { _id: currentUserId } = currentUser

  //  A custom hook to help handle common open, close, or toggle scenarios. 
  // See this docs for more information: https://chakra-ui.com/usedisclosure
  const { isOpen: isOpenComment, onOpen: onOpenComment, onClose: onCloseComment } = useDisclosure()
  const { isOpen, onOpen, onClose } = useDisclosure()

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
              ? <Box as={Link} to={`/profile/post/${postId}`} w="full" h="full" pos="absolute" top="0" left="0" bottom="0" right="0"></Box>
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
            <ItemList items={items} type={type}>
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
              <IconButton 
                isDisabled={status !== "PENDING" || userId === currentUserId ? true : false} 
                size="lg" variant="ghost" 
                isRound icon={type === "donation" ? BiMessageAltEdit : BiDonateHeart} 
                onClick={onOpen} 
              />
              {/* Comment Button */}
              <IconButton variant="ghost" size="lg" isRound icon={BiCommentDots} onClick={onOpenComment} />
              {/* Like Button  */}
              <LikeButton postId={postId} likers={likers} />
            </Flex>
            {props.children}
          </PseudoBox>
      }
      {/* Modals */}
      {
        type === "donation" ? 
          <RequestFormModal 
            isOpen={isOpen} 
            onClose={onClose}
            items={items}
            postId={postId}
          />
        : 
          <DonateFormModal 
            isOpen={isOpen} 
            onClose={onClose}
            items={items}
            donate={donate}
            postId={postId} 
          />
      }
      <CommentFormModal 
        isOpen={isOpenComment} 
        onClose={onCloseComment}
        addComment={addComment} 
      />
    </div>
	)
}

export default Post