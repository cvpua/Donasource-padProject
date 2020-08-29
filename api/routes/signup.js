const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const brcypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const Auth = require('../controllers/signup');
const User = require('../models/user');
const { response } = require('express');



router.post('/api/signup', Auth.signup) 


// login user
router.post('/api/login', Auth.login)


router.post('/api/logout',Auth.logout)

module.exports = router;