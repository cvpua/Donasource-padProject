const express = require('express');
const app = express();

const postsApi = require('./routes/api/posts');
const usersApi = require('./routes/api/users');

app.use(express.json());
app.use(express.urlencoded({extended:false}))


app.use('/', postsApi);
app.use('/',usersApi);


const port = process.env.PORT || 5000;
app.listen(port,console.log(`Server started on port ${port}`));