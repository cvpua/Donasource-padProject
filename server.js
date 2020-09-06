const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const cron = require('node-cron');
const axios = require('axios');



const postsApi = require('./api/routes/posts');
const usersApi = require('./api/routes/users');
const signupApi = require('./api/routes/signup');
const updateApi = require('./api/routes/updates');
const Post = require('./api/models/post');


// connect to db
mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

let protected = ['transformed.js', 'main.css', 'favicon.ico']

app.get("*", (req, res) => {

  let path = req.params['0'].substring(1)

  if (protected.includes(path)) {
    // Return the actual file
    res.sendFile(`${__dirname}/build/${path}`);
  } else {
    // Otherwise, redirect to /build/index.html
    res.sendFile(`${__dirname}/build/index.html`);
  }
});


// body-parser
app.use(express.json());
app.use(express.urlencoded({extended:false}))


app.use('/',postsApi);
app.use('/',usersApi);
app.use('/',signupApi);
app.use('/',updateApi);




const task = cron.schedule('5 * * * *', () => {
   axios.get('http://localhost:5000/api/checkDeadlines')
})
task.start()


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`)
});