const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const linkSchema = new Schema({
  url: {
    type: String,
    required: true,
    trim: true,
  },

  title: {
    type: String,
    required: true,
  },

  icon: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Link", linkSchema);
