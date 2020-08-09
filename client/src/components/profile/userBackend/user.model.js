const mong = require("mongoose");
require("mongoose-type-email"); //for email : npm install mongoose-type-email
//TODO: post schema
const Schema = mong.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 5,
    },
    password: { type: String, required: true },
    fname: { type: String, required: true, trim: true },
    lname: { type: String, required: true, trim: true },
    location: { type: String, required: true },
    email: {
      type: mong.SchemaTypes.Email,
      required: true,
      unique: true,
      trim: true,
    },
    contact: { type: String, required: true, trim: true },
    bio: { type: String, minlength: 20 },
    //TODO: post schema here and lenght of post
  },
  {
    timestamps: true,
  }
);

const User = mong.model("User", userSchema);

module.exports = User;
