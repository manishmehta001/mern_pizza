const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A user must have a name'],
    },
    email: {
      type: String,
      required: [true, 'Please provoide a email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
    },
    confirmpassword: {
      type: String,
      required: [true, 'Please provide a confirm password'],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamp: true,
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;

// const userSchema = mongoose.Schema(
//   {
//     name: { type: String, require },
//     email: { type: String, require },
//     password: { type: String, require },
//     isAdmin: { type: Boolean, require, default: false },
//   },
//   { timestamp: true }
// );
// const User = mongoose.model('User', userSchema);
// module.exports = User;
