const express = require("express");
const passport = require("passport");
const authenticate = require("../authenticate");
const multer = require("multer");
//const fs = require("fs")
const User = require("../models/user");

//router setup
const uploadRouter = express.Router();
uploadRouter.use(express.json());

//configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const imageFileFilter = (req, file, cb) => {
  console.log(" imageFileFilter ", file);
  //regex to define accepted img extensions
  /*  if (!file.mimetype.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("You can only upload  image files!", 400), false);
  } */
  cb(null, true);
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5000000, // max file size 5MB = 5000000 bytes
  },
  fileFilter: imageFileFilter,
});

uploadRouter
  .route("/")

  //upload.single("imageFile") is pointing to the form filed  attr
  .patch(
    passport.authenticate("jwt", {session: false}),
    upload.single("imageFile"),
    (req, res) => {
      console.log("req.file at upload router " + req.file);
      if (!req.file) {
        res
          .status(400)
          .json({message: {msgBody: "Please upload a file", msgError: true}});
      }
      console.log("mimetype before upload  " + req.file.mimetype);
      /*  var Img = fs.readFileSync(req.file.path);
      var encImg = Img.toString("base64");
      // Define a JSONobject for the image attributes for saving to database
      var finalImg = {
        mimetype: req.file.mimetype,
        // image: new Buffer(encImg, "base64"),
        image: req.file.path,
      }; */

      User.findById({_id: req.user._id})
        .then((user) => {
          user.image.file = req.file.path;
          user.image.mimetype = req.file.mimetype;
          console.log("user image  " + user.image);
          user.save((err) => {
            if (err)
              res.status(500).json({
                message: {msgBody: "Error has occured!", msgError: true},
              });
            else
              res.status(200).json({
                message: {
                  msgBody: "Image uploaded successfully!",
                  msgError: false,
                },
              });
          });
          //    .then((user) => res.status(200).json(user));
        })
        .catch((err) =>
          res.status(400).json({message: {msgBody: err, msgError: true}})
        );
    }
  );

uploadRouter
  .route("/")
  .put(passport.authenticate("jwt", {session: false}), (req, res) => {
    console.log("req.body from router  ", req.body);
    User.findById({_id: req.user._id})
      .then((user) => {
        user.avatarImage = req.body.avatarImage;
        user.save((err) => {
          if (err) {
            res.status(500).json(err);
          } else {
            res.status(200).json({
              message: {
                msgBody: "Image style updated successfully!",
                msgError: false,
              },
            });
          }
        });
      })
      .catch((err) => res.status(400).json(err));
  });

module.exports = uploadRouter;
