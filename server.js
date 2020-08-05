const express = require('express');
const app = express();
const mongoose = require('mongoose')
const db = require('./config/keys').mongoURI;


const postsApi = require('./routes/api/posts');
const usersApi = require('./routes/api/users');
const signupApi = require('./routes/api/signup');


mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({extended:false}))


app.use('/', postsApi);
app.use('/',usersApi);
app.use('/',signupApi);


const port = process.env.PORT || 5000;
app.listen(port,console.log(`Server started on port ${port}`));