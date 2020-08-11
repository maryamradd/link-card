const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

const userRouter = require("./routes/user");
const dashboardRouter = require("./routes/dashboard");

mongoose.connect(
  "mongodb://localhost:27017/linkcard-app",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("connected to db successfully");
  }
);

app.listen(5000, () => {
  console.log("connected to server successfully");
});

app.use("/", userRouter);
app.use("/dashboard", dashboardRouter);

module.exports = app;
