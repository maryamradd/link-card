const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },
    links: [linkSchema],
  },
  {timestamps: true}
);

const linkSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("User", userSchema);
