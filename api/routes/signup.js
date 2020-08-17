const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const brcypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const Auth = require('../controllers/signup');
const User = require('../models/user');
const { response } = require('express');


// signup
// req attributes:
// username 
// password   
// firstName 
// lastName 
// email
// location
// contactNumber
router.post('/api/signup', Auth.signup) 


// login user
// req attributes:
// email
// password
router.post('/api/login', Auth.login)

module.exports = router;