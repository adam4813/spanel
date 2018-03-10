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
        callbackURL: config.twitter.callbackURL
      },
      (accessToken, refreshToken, profile, done) => {
        var updates = {
          name: profile.displayName,
          someID: profile.id,
          twitter: {
            displayName: profile.displayName,
            id: profile.id,
            token: accessToken
          }
        };
        findUserOrCreate(accessToken, updates, done);
      }
    )
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL,
        profileFields: ["id", "email", "displayName"]
      },
      (accessToken, refreshToken, profile, done) => {
        var updates = {
          name: profile.displayName,
          someID: profile.id,
          facebook: {
            name: profile.displayName,
            id: profile.id,
            token: accessToken
          }
        };
        findUserOrCreate(accessToken, updates, done);
      }
    )
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackURL,
        scope: "https://www.googleapis.com/auth/plus.login"
      },
      (accessToken, refreshToken, profile, done) => {
        var updates = {
          name: profile.displayName,
          someID: profile.id,
          google: {
            name: profile.displayName,
            id: profile.id,
            token: accessToken
          }
        };
        findUserOrCreate(accessToken, updates, done);
      }
    )
  );

  function findUserOrCreate(accessToken, updates, done) {
    var searchQuery = {
      name: updates.name
    };

    var options = {
      upsert: true
    };

    // update the user if s/he exists or add a new user
    User.findOneAndUpdate(searchQuery, updates, options, function (err, user) {
      if (err) {
        return done(err);
      } else {
        return done(null, user);
      }
    });
  }
};
