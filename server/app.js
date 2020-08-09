const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
mongoose.connect(
  "mongodb://localhost:27017/linkcard-app",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("conecctedt to db succefully");
  }
);

app.listen(5000, () => {
  console.log("conecctedt to server succefully");
});
