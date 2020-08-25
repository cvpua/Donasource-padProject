const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;


const postsApi = require('./api/routes/posts');
const usersApi = require('./api/routes/users');
const signupApi = require('./api/routes/signup');
const updateApi = require('./api/routes/updates');

// connect to db
mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// body-parser
app.use(express.json());
app.use(express.urlencoded({extended:false}))


app.use('/',postsApi);
app.use('/',usersApi);
app.use('/',signupApi);
app.use('/',updateApi);
app.use('/assets',express.static('assets'))


const port = process.env.PORT || 5000;
app.listen(port,console.log(`Server started on port ${port}`));