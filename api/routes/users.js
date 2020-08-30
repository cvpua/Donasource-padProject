const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');


// get all user
router.get('/api/users',UserController.getAllUsers)


// get one user
router.get('/api/users/:userId',UserController.getUser)



// get all post liked by a user
router.get('/api/users/:userId/likedPosts',UserController.getLikedPosts)


// Notification
// Schema
// const notification = new Notification({
//     postId : post._id,
//     userId : req.body.userId,
//     username : req.body.username,
//     name : req.body.name,
//     response : req.body.author + " liked your post",
//     date : Date.now()
// })
router.get('/api/users/:userId/notifications',UserController.getAllNotifications)


// Go to a notif/ get notif
router.get('/api/users/:userId/notifications/:notifId',UserController.getNotification)


router.patch('/api/user/:userId/editUser',UserController.editUser)


//oldPassword
//newPassword
//newPasswordCopy
router.patch('/api/user/:userId/changePassword',UserController.changePassword)


module.exports = router;