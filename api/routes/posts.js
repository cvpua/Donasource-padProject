const express = require('express');
const router = express.Router();

const checkAuth = require('../auth/check-auth');
const PostController = require('../controllers/post');


//get all posts
router.get('/api/posts',PostController.getAllPosts)

// get a post
router.get('/api/posts/:postId',PostController.getPost)

// get images
router.get('/api/posts/images',PostController.getImages)

//make a post
router.post('/api/posts',checkAuth,PostController.makePost);

//make a comment
router.patch('/api/posts/:postId/comments',checkAuth,PostController.makeComment);

//like/unlike a post
router.patch('/api/posts/:postId/likes',checkAuth,PostController.likePost);

//donate 
router.put('/api/posts/:postId/donate',checkAuth,PostController.donate);

//request
router.patch('/api/posts/:postId/request',checkAuth,PostController.request);


// delete a post
router.delete('/api/posts/:postId',checkAuth,PostController.deletePost);


module.exports = router;