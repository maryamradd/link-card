const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const router = express.Router();
const authenticate = require("../authenticate");
const User = require("../models/user");

router.get("/", (req, res) => {
  console.log("///");
});

// SIGNUP //

router.post("/signup", (req, res) => {
  // convenient method to register a new user instance with a given password + Checks if username is unique
  User.register(
    new User({username: req.body.username}),
    req.body.password,
    (err, user) => {
      if (err) {
        res.status(500).json({message: {msgBody: err, msgError: true}});
      } else {
        //save and authenticate
        user.save((err, user) => {
          if (err) {
            res.status(500).json({message: {msgBody: err, msgError: true}});
            return;
          }
          passport.authenticate("local")(req, res, () => {
            res.status(200).json({
              message: {msgBody: "Registration Successful!", msgError: false},
            });
          });
        });
      }
    }
  );
});

// LOGIN //

router.post(
  "/login",
  passport.authenticate("local", {session: false}),
  (req, res) => {
    if (req.isAuthenticated()) {
      //create jwt token
      var token = authenticate.getToken({_id: req.user._id});
      // set cookie with token
      res.cookie("access_token", token, {httpOnly: true, sameSite: true});
      res.status(200).json({isAuthenticated: true, user: req.user.username});
      //redirect to dashboard
    }
  }
);

// LOGOUT //

router.get(
  "/logout",
  passport.authenticate("jwt", {session: false}),
  (req, res) => {
    res.clearCookie("access_token");
    res.status(200).json({user: {username: ""}, success: true});
  }
);

//react state mangmnt //

router.get(
  "/loggedIn",
  passport.authenticate("jwt", {session: false}),
  (req, res) => {
    res.status(200).json({isAuthenticated: true, user: req.user});
  }
);

// USER CARD //

router.get("/:username", (req, res) => {
  const username = req.params.username;
  const queryUsername = "^" + username + "$";
  User.findOne({username: req.params.username})
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) =>
      res.status(400).json({message: {msgBody: err, msgError: true}})
    );
});

module.exports = router;
