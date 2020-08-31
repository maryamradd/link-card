const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("./models/user");

//generates JWT token
exports.getToken = (user) => {
  return JWT.sign(user, process.env.JWT_SECRET, {expiresIn: 3600});
};

//to extract the JWT in a cookie
var cookieExtractor = (req) => {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies["access_token"];
  }
  return token;
};

//local authentication strategy using username and password
exports.local = passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({username}, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (!user) {
        //user doesnt exist
        return done(null, false);
      }

      //the user exists so compare password against db
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return done(err, false);
        }
        if (!isMatch) {
          return done(null, isMatch);
        }

        return done(null, user);
      });
    });
  })
);

// JWT strategy options
const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET,
};

exports.jwtPassport = passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    //check if user exists
    User.findOne({id: jwt_payload.sub}, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        //user doesn't exists
        return done(null, false);
      }
    });
  })
);

exports.verifyUserLocal = passport.authenticate("local", {
  session: false,
  // successRedirect: "/",
});

exports.verifyUser = passport.authenticate("jwt", {session: false});
