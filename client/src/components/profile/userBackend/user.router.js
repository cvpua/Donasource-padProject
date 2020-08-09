//FIXME: check for changes in model

const router = require("express").Router();
let User = require("./user.model");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((error) => res.status(400).json("[ERROR]:" + error));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const fname = req.body.fname;
  const lname = req.body.lname;
  const location = req.body.location;
  const email = req.body.email;
  const contact = req.body.contact;
  const bio = req.body.bio;

  const newUser = new User({
    username,
    password,
    fname,
    lname,
    location,
    email,
    contact,
    bio,
  });

  newUser
    .save()
    .then(() => res.json("USER ADDED"))
    .catch((err) => res.status(400).json("[ERROR]:" + err));
});

router.route("/edit/:id").post((req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      user.username = req.body.username;
      user.password = req.body.password;
      user.fname = req.body.fname;
      user.lname = req.body.lname;
      user.location = req.body.location;
      user.email = req.body.email;
      user.contact = req.body.contact;
      user.bio = req.body.bio;
      user
        .save()
        .then(() => res.json("USER EDITED"))
        .catch((err) => res.status(400).json("[ERROR]:" + err));
    })
    .catch((err) => res.status(400).json("[ERROR]:" + err));
});

module.exports = router;
