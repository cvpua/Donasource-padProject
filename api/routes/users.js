const express = require('express');
const router = express.Router();


const UserController = require('../controllers/user');


// get all user
router.get('/api/users',UserController.getAllUsers)


// get one user
// req attributes: 
// userId
router.get('/api/users/:userId',UserController.getUser)



// get all post liked by a user
// req attribute: 
// userId
router.get('/api/users/:userId/likedPosts',UserController.getLikedPosts)


module.exports = router;