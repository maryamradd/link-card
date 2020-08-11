const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

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

const userSchema = new Schema(
  {
    /*username: {
      type: String,
      min: 3,
      unique: true,
    },
    password: {
      type: String,
      min: 5,
      max: 20,
    },*/
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

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);
