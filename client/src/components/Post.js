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
  Image,
  Badge,
  Divider,
} from '@chakra-ui/core'
import { BiDonateHeart, BiCommentDots, BiMessageAltEdit} from 'react-icons/bi'
import LikeButton from './LikeButton.js'
import { Link } from 'react-router-dom'
import PostSkeleton from './PostSkeleton.js'
import {UserContext} from '../App.js'
import CommentFormModal from './CommentFormModal.js'
import RequestFormModal from './RequestFormModal.js'
import DonateFormModal from './DonateFormModal.js'
import Likers from './Likers.js'
import People from './People.js'

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
    datePosted,
    comments,
    location,
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

  const [items, setItems] = useState([])
  const [status, setStatus] = useState('')

  const currentDate = new Date()
  const dateDeadline = new Date(deadline)
  const timeRemaining = dateDeadline.getTime() - currentDate.getTime() 

  const daysRemaining = Math.ceil(timeRemaining / (1000 * 3600 * 24))
  const hoursRemaining = Math.ceil(timeRemaining / (1000 * 3600))
  const minsRemaining = Math.ceil(timeRemaining / (1000 * 60))

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
              ? <Box as={Link} to={`/${username}/post/${postId}`} w="full" h="full" pos="absolute" top="0" left="0" bottom="0" right="0"></Box>
              : "" 
            }
            {/* Post Header */}
            <PostHeader
            	avatar={avatar} 
      				title={title} 
      				author={author} 
      				deadline={deadline}
              status={status}
              username={username}
              datePosted={datePosted}
            />
          	{/* Post Content */}
            <Box my="4">
              {/* Title */}
              <Text fontWeight="extrabold" fontFamily="heading" >{title}</Text>
              {/* Deadline */}
              <Box>
                <Badge 
                  variantColor={
                    status === "PENDING" ? "pink"
                    : status === "UNFULFILLED" ? "yellow"
                    : "green"
                  }
                >
                  {
                    status !== "PENDING" ? status
                    :hoursRemaining <= 1 ? `${minsRemaining} mins left`
                    : daysRemaining <= 1 ? `${hoursRemaining} hrs left`
                    : `${daysRemaining} days left`
                  }
                </Badge>
              </Box>
              <Text mt="4" fontSize="sm">{description}</Text>
              <Flex mt="4">
                <Text fontSize="sm" mr="2">Location:</Text>
                <Text fontSize="sm" fontWeight="bold">{location}</Text>
              </Flex>
            </Box>
          	{/* Item List */}
            <ItemList items={items} type={type}>
            {/* Images */}
              {
                images && isPostSection ?
                  (images.map((image) => (
                    <Image src={image.url} w="full" h="64" mt="2" objectFit="cover" /> 
                  )))
                : images && images.length !== 0 ?
                  <Image src={images[0].url} w="full" h="64" mt="2" objectFit="cover" /> 
                : ""
              }
            </ItemList>
            {/* Tags */}
            <Tags tags={tags} />
            
            <Divider/>
            
            <Flex>
              <Likers likers={likers} type={type} />
              <People items={items} type={type} />
            </Flex>
  
            <Divider />
            {/* Post Actions */}
            <Flex justify="space-around" pt="2">
              {/* Donate Button */}
              <IconButton 
                isDisabled={(status !== "PENDING" || userId === currentUserId) ? true : false} 
                size="lg" 
                variant="ghost" 
                isRound icon={type === "donation" ? BiMessageAltEdit : BiDonateHeart} 
                onClick={onOpen} 
              />
              {/* Comment Button */}
              <Flex align="center"> 
                <IconButton variant="ghost" size="lg" rounded="full" icon={BiCommentDots} onClick={onOpenComment} />
                <Box visibility={comments.length === 0 ? "hidden" : "visible"}>
                  {comments.length}
                </Box>
              </Flex>
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
        postId={postId}
      />
    </div>
	)
}

export default Post