const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// express setup
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// routers
const userRouter = require("./routes/user");

//load environment variables
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

// start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// routers setup
app.use("/", userRouter);

module.exports = app;
