const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const router = express.Router();
const authenticate = require("../authenticate");
const User = require("../models/user");

//this router is not used /:username

router.route("/").get(authenticate.verifyUser, (req, res) => {
  console.log("dashboard");
});

router.post("/", (req, res) => {});

module.exports = router;
