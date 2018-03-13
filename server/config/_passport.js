var TwitterStrategy = require("passport-twitter").Strategy;
var FacebookStrategy = require("passport-facebook").Strategy;
var GoogleStrategy = require("passport-google-oauth20").Strategy;

var User = require("../models/user");
var config = require("./_config");

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  passport.use(
    new TwitterStrategy(
      {
        consumerKey: config.twitter.consumerKey,
        consumerSecret: config.twitter.consumerSecret,
        callbackURL: config.twitter.callbackURL,
        profileFields: ["id", "email", "displayName"],
        scope: ["email"],
        passReqToCallback: true
      },
      (req, accessToken, refreshToken, profile, done) => {
        process.nextTick(function () {
          if (!req.user) {
            var updates = {
              twitter: {
                displayName: profile.displayName,
                id: profile.id,
                token: accessToken
              }
            };
            findUserOrCreate(
              accessToken,
              { "twitter.id": profile.id },
              updates,
              done
            );
          } else {
            var user = req.user;
            user.twitter.id = profile.id;
            user.twitter.token = accessToken;
            user.twitter.displayName = profile.displayName;

            user.save(function (err) {
              if (err) {
                throw err;
              }
              return done(null, user);
            });
          }
        });
      }
    )
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL,
        profileFields: ["id", "email", "displayName"],
        scope: ["email"],
        passReqToCallback: true
      },
      (req, accessToken, refreshToken, profile, done) => {
        process.nextTick(function () {
          if (!req.user) {
            var updates = {
              facebook: {
                name: profile.displayName,
                id: profile.id,
                token: accessToken,
                email: profile.emails[0].value
              }
            };
            findUserOrCreate(
              accessToken,
              { "facebook.id": profile.id },
              updates,
              done
            );
          } else {
            var user = req.user;
            user.facebook.id = profile.id;
            user.facebook.token = accessToken;
            user.facebook.name = profile.displayName;
            user.facebook.email = profile.emails[0].value;

            user.save(function (err) {
              if (err) {
                throw err;
              }
              return done(null, user);
            });
          }
        });
      }
    )
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackURL,
        profileFields: ["id", "email", "displayName"],
        scope: ["https://www.googleapis.com/auth/plus.login", "email"],
        passReqToCallback: true
      },
      (req, accessToken, refreshToken, profile, done) => {
        process.nextTick(function () {
          if (!req.user) {
            var updates = {
              google: {
                name: profile.displayName,
                id: profile.id,
                token: accessToken,
                email: profile.emails[0].value
              }
            };
            findUserOrCreate(
              accessToken,
              { "google.id": profile.id },
              updates,
              done
            );
          } else {
            var user = req.user;
            user.google.id = profile.id;
            user.google.token = accessToken;
            user.google.name = profile.displayName;
            user.google.email = profile.emails[0].value;

            user.save(function (err) {
              if (err) {
                throw err;
              }
              return done(null, user);
            });
          }
        });
      }
    )
  );

  function findUserOrCreate(accessToken, search, updates, done) {
    var options = {
      upsert: true
    };

    // update the user if s/he exists or add a new user
    User.findOneAndUpdate(search, updates, options, function (err, user) {
      if (err) {
        return done(err);
      } else {
        return done(null, user);
      }
    });
  }
};
