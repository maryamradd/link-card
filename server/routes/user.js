const express = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const router = express.Router();
const authenticate = require("../authenticate");
const User = require("../models/user");
const Link = require("../models/link");

router.get("/", (req, res) => {
  console.log("///");
});

router.get(
  "/authenticated",
  passport.authenticate("jwt", {session: false}),
  (req, res) => {
    const {username} = req.user;
    res.status(200).json({isAuthenticated: true, user: {username}});
  }
);

router.get(
  "/links",
  passport.authenticate("jwt", {session: false}),
  (req, res) => {
    User.findById({_id: req.user._id})
      .populate("links")
      .exec((err, document) => {
        if (err)
          res
            .status(500)
            .json({message: {msgBody: "Error has occured", msgError: true}});
        else {
          res.status(200).json({links: document.links, authenticated: true});
        }
      });
  }
);

// SIGNUP //

router.post("/signup", async (req, res) => {
  const {username, password} = req.body;

  // check if username already registred
  const existingUser = await User.findOne({username: username});
  if (existingUser) {
    return res.status(400).json({
      message: {
        msgBody: "an account with this username already exists",
        msgError: true,
      },
    });
  }

  // to register a new user:
  // hash the password --> create a new user record --> store in db

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  // create new user with the hashed password
  const newUser = new User({username, password: passwordHash});

  // store new user in db
  const savedUser = await newUser.save((err) => {
    if (err)
      res
        .status(500)
        .json({message: {msgBody: "an error has occured", msgError: true}});
    else
      res.status(201).json({
        message: {msgBody: "account successfully created", msgError: false},
      });
  });

  // create jwt token
  var token = authenticate.getToken({_id: savedUser._id});
  // set cookie with token
  res.cookie("access_token", token, {httpOnly: true, sameSite: true});
});

// LOGIN //

router.post(
  "/login",
  passport.authenticate("local", {session: false}),
  async (req, res) => {
    if (req.isAuthenticated()) {
      //create jwt token
      var token = authenticate.getToken({_id: req.user._id});
      // set cookie with token
      res.cookie("access_token", token, {httpOnly: true, sameSite: true});
      res.status(200).json({isAuthenticated: true, user: req.user.username});
      //redirect somewhere
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

// SHAREABLE USER CARD //

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

// ADD NEW LINK //

router.post(
  "/addLink",
  passport.authenticate("jwt", {session: false}),
  (req, res) => {
    const link = new Link(req.body);
    link.save((err) => {
      if (err)
        res
          .status(500)
          .json({message: {msgBody: "Error has occured!", msgError: true}});
      else {
        console.log(req.user);
        console.log(req.user.links);
        req.user.links.push(link);
        req.user.save((err) => {
          if (err)
            res
              .status(500)
              .json({message: {msgBody: "Error has occured!", msgError: true}});
          else
            res.status(200).json({
              message: {
                msgBody: "Link created successfully!",
                msgError: false,
              },
            });
        });
      }
    });
  }
);

// RETRIVE USER LINKS

/* router.get(
  "/links",
  passport.authenticate("jwt", {session: false}),
  (req, res) => {
    User.findOne({_id: req.user._id})
      .populate("links")
      .exec((err, document) => {
        if (err)
          res
            .status(500)
            .json({message: {msgBody: "Error has occured!", msgError: true}});
        else {
          res.status(200).json({isAuthenticated: true, links: document.links});
        }
      });
  }
); */

//react state mangmnt //

/* router.get(
  "/loggedIn",
  passport.authenticate("jwt", {session: false}),
  (req, res) => {
    console.log("dsjfkjsdhfiuhsdiukjfhsd");
    const username = req.user;
    res.status(200).json({isAuthenticated: true, user: username});
  }
); */

router.get(
  "/loggedIn",
  passport.authenticate("jwt", {session: false}),
  (req, res) => {
    if (req.user == null) {
      console.log("whaat");
    }
    const username = req.user;
    res.status(200).json({isAuthenticated: true, user: username});
  }
);

module.exports = router;
