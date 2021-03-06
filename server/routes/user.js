const express = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const multer = require("multer");
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

router.get(
  "/profile",
  passport.authenticate("jwt", {session: false}),
  (req, res) => {
    User.findById({_id: req.user._id})
      .select("-password -links -createdAt -updatedAt -__v -_id")
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) =>
        res.status(400).json({message: {msgBody: err, msgError: true}})
      );
  }
);

router.patch(
  "/profile",
  passport.authenticate("jwt", {session: false}),
  (req, res) => {
    User.findById({_id: req.user._id})
      .then((user) => {
        user.displayName = req.body.displayName || user.displayName;
        user.bio = req.body.bio || user.bio;
        user.primaryColor = req.body.primaryColor || user.primaryColor;
        user.backgroundColor = req.body.backgroundColor || user.backgroundColor;
        user.save((err) => {
          if (err) {
            res.status(500).json(err);
          } else {
            res.status(200).json({
              message: {
                msgBody: "Profile updated successfully!",
                msgError: false,
              },
            });
          }
        });
      })
      .catch((err) => res.status(400).json(err));
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
  await newUser.save((err) => {
    if (err)
      res
        .status(500)
        .json({message: {msgBody: "an error has occured", msgError: true}});
    else
      res.status(201).json({
        message: {msgBody: "account successfully created", msgError: false},
      });
  });
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

/*
    @route PATCH /editLink/:linkId
    @desc edit a chosen link
    @access private
    
*/

router.patch(
  "/editLink/:linkId",
  passport.authenticate("jwt", {session: false}),
  (req, res) => {
    const linkId = req.params.linkId;
    User.findById({_id: req.user._id})
      .then((user) => {
        user.links.forEach((link) => {
          if (link._id == linkId) {
            link.url = req.body.url || link.url;
            link.title = req.body.title || link.title;
            link.icon = req.body.icon || link.icon;
          }
        });

        user.save((err) => {
          if (err) {
            res.status(500).json({message: {msgBody: err, msgError: true}});
          } else {
            res.status(200).json({
              message: {
                msgBody: "Link updated successfully!",
                msgError: false,
              },
            });
          }
        });
      })
      .catch((err) =>
        res.status(400).json({message: {msgBody: err, msgError: true}})
      );
  }
);

/*
    @route DELETE /deleteLink/:linkId
    @desc delete a link
    @access private
    
*/

router.delete(
  "/deleteLink/:linkId",
  passport.authenticate("jwt", {session: false}),
  (req, res) => {
    const linkId = req.params.linkId;
    User.findById({_id: req.user._id})
      .then((user) => {
        user.links.forEach((link, index) => {
          if (link._id == linkId) {
            user.links.splice(index, 1);
          }
        });

        user.save((err) => {
          if (err) {
            res.status(500).json({message: {msgBody: err, msgError: true}});
          } else {
            res.status(200).json({
              message: {
                msgBody: "Link deleted successfully!",
                msgError: false,
              },
            });
          }
        });
      })
      .catch((err) =>
        res.status(400).json({message: {msgBody: err, msgError: true}})
      );
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

/* 
//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
  res.status(404).send('what???');
});
 */

module.exports = router;
