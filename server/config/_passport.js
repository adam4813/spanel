var TwitterStrategy = require("passport-twitter").Strategy;
var FacebookStrategy = require("passport-facebook").Strategy;
var GoogleStrategy = require("passport-google-oauth20").Strategy;
var TwitchStrategy = require("passport-twitch").Strategy;

var User = require("../models/user");
var config = require("./_config");

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
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
      (req, accessToken, secretToken, profile, done) => {
        process.nextTick(function() {
          var updateData = {
            provider: "twitter",
            name: profile.displayName,
            id: profile.id,
            token: accessToken,
            secret: secretToken
          };
          addOrUpdateProvider(req.user ? req.user._id : null, updateData, done);
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
        scope: ["email", "publish_actions"],
        passReqToCallback: true
      },
      (req, accessToken, refreshToken, profile, done) => {
        process.nextTick(function() {
          var updateData = {
            provider: "facebook",
            name: profile.displayName,
            id: profile.id,
            token: accessToken,
            email: profile.emails[0].value
          };
          addOrUpdateProvider(req.user ? req.user._id : null, updateData, done);
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
        process.nextTick(function() {
          var updateData = {
            provider: "google",
            name: profile.displayName,
            id: profile.id,
            token: accessToken,
            email: profile.emails[0].value
          };
          addOrUpdateProvider(req.user ? req.user._id : null, updateData, done);
        });
      }
    )
  );

  passport.use(
    new TwitchStrategy(
      {
        clientID: config.twitch.clientID,
        clientSecret: config.twitch.clientSecret,
        callbackURL: config.twitch.callbackURL,
        profileFields: ["id", "email", "displayName"],
        scope: ["channel_feed_edit", "user_read"],
        passReqToCallback: true
      },
      (req, accessToken, refreshToken, profile, done) => {
        process.nextTick(function() {
          var updateData = {
            provider: "twitch",
            id: profile.id,
            token: accessToken,
            name: profile.displayName,
            email: profile.email
          };
          addOrUpdateProvider(req.user ? req.user._id : null, updateData, done);
        });
      }
    )
  );

  function addOrUpdateProvider(userId, updateData, done) {
    if (userId === null) {
      User.create({ accounts: [updateData] }, function(err, user) {
        if (err) {
          return done(err);
        } else {
          return done(null, user);
        }
      });
    } else {
      let search = {
        _id: userId,
        accounts: {
          $elemMatch: {
            provider: updateData.provider
          }
        }
      };
      User.count(search, function(err, count) {
        var update;
        if (count == 0) {
          // Just search with the userId as the userId/provider combo doesn't exists, but the userId might.
          search = { _id: userId };
          update = {
            $push: {
              accounts: [updateData]
            }
          };
        } else {
          update = {
            $set: { "accounts.$": updateData }
          };
        }
        User.findOneAndUpdate(
          search,
          update,
          {
            upsert: true,
            new: true
          },
          function(err, user) {
            if (err) {
              return done(err);
            } else {
              return done(null, user);
            }
          }
        );
      });
    }
  }
};
