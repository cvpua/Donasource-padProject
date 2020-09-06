const Post = require('../models/post');

exports.checkDeadlines = () => {
    Post.find()
    .exec()
    .then(posts => {
        posts.map(post => {
            if (post.deadline - Date.now() <= 0 && post.status === "PENDING"){
                post.status = "UNFULFILLED";
                post.save()
                .then(response => console.log("Post updated!"))
                .catch(err => console.log(err))
            }
        })
        console.log("Done checking!")
    })
    .catch(err => {
        console.log(err)
    })
}