const express = require('express');
const router = express.Router();

const checkAuth = require('../auth/check-auth');
const PostController = require('../controllers/post');


//get all posts
router.get('/api/posts',PostController.getAllPosts)



// get a post
//reqs attributes
// postId
router.get('/api/posts/:postId',PostController.getPost)


//make a post
//req attributes
// avatar ,
// title ,
// author ,
// type ,
// status ,
// description ,
// items,
// location,
// tags,
// datePosted,
// deadline,
// photos ,
router.post('/api/posts',checkAuth,PostController.makePost);

//make a comment
// req attributes
// avatar
// username
// content
// postId
router.patch('/api/posts/:postId/comments',checkAuth,PostController.makeComment);

// like/unlike a post
// req attributes
// userId
// postId
router.patch('/api/posts/:postId/likes',checkAuth,PostController.likePost);

// delete a post
// req attributes
// postId
router.delete('/api/posts/:postId',checkAuth,PostController.deletePost);


module.exports = router;