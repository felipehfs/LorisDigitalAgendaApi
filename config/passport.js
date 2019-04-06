const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("../models/user");
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_TOKEN || "Amoeba";

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, function(jwtPayload, done) {
      User.findOne(
        { email: jwtPayload.email, username: jwtPayload.username },
        function(err, user) {
          if (err) {
            return done(err, false);
          }

          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        }
      );
    })
  );
};
