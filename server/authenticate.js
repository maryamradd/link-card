const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JWT = require("jsonwebtoken");
const User = require("./models/user");
const config = require("./config");

exports.getToken = (user) => {
  return JWT.sign(user, config.secretKey, {expiresIn: 3600});
};

//to extract the JWT in a cookie
var cookieExtractor = (req) => {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
};

//jwt strategy options
var opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = config.secretKey;

//JWT authentication strategy (authuorazation)
exports.jwtPassport = passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    //check if user exists
    User.findOne({id: jwt_payload.sub}, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  })
);

//local authentication strategy
exports.local = passport.use(new LocalStrategy(User.authenticate()));

exports.verifyUser = passport.authenticate("jwt", {session: false});
