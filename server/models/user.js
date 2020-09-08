const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const linkSchema = require("./link").schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      min: 3,
      max: 20,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      min: 5,
      max: 20,
      trim: true,
    },

    displayName: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    image: {
      file: {type: String, default: ""},
      mimetype: {type: String, default: ""},
    },

    avatarImage: {
      type: Boolean,
      default: true,
    },

    primaryColor: {
      type: String,
      default: "",
    },

    backgroundColor: {
      type: String,
      default: "",
    },

    links: {
      type: [linkSchema],
    },
  },
  {timestamps: true}
);

module.exports = mongoose.model("User", userSchema);
