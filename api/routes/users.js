const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');


// get all user
router.get('/api/users',UserController.getAllUsers)


// get one user
router.get('/api/users/:userId',UserController.getUser)



// get all post liked by a user
router.get('/api/users/:userId/likedPosts',UserController.getLikedPosts)


// get all the notifs of a user
router.get('/api/users/:userId/notifications',UserController.getAllNotifications)


// Change the seen value from false to true
router.get('/api/users/:userId/notifications/:notifId',UserController.seeNotification)


// {field/s : updatedValue}
router.patch('/api/user/:userId/editUser',UserController.editUser)


//oldPassword
//newPassword
//newPasswordCopy
router.patch('/api/user/:userId/changePassword',UserController.changePassword)


module.exports = router;