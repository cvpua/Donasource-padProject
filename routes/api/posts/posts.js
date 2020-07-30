const express = require('express');
const router = express.Router();

const posts = require('../../../LocalDB/Posts');

router.get('/api/posts',(req,res) => {
    res.json(posts);
})

module.exports = router;