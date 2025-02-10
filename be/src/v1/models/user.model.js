"use strict";
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

userSchema.pre('save', function(next){
  // set user avatar
  if (!this.profilePic) {
      const firtName = this.fullName.split(' ')[0];
      this.profilePic = `https://ui-avatars.com/api/?name=${firtName}size=128`;
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;