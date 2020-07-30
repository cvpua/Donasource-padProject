const express = require('express');
const app = express();

const postsApi = require('./api/posts/posts');

app.use(express.json());
app.use(express.urlencoded({extended:false}))


app.use('/', postsApi);




const port = process.env.PORT || 5000;
app.listen(port,console.log(`Server started on port ${port}`));