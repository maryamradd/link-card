const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();

// express setup
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// routers
const userRouter = require("./routes/user");
const uploadRouter = require("./routes/uploadRouter");

// load environment variables
const hostname = process.env.HOST;
const port = process.env.PORT;

// mongoose setup
mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
  {
    //to remove mongoose deprecation warnings
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to mongoDB successfully");
  }
);

// public directory for image uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routers setup
app.use("/", userRouter);
app.use("/profile/upload", uploadRouter);

// start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;
