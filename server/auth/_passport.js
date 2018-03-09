var passport = require("passport");
var TwitterStrategy = require("passport-twitter").Strategy;

var User = require("../models/user");
var config = require("../_config");

require("./init")(passport);

passport.use(
  new TwitterStrategy(
    {
      consumerKey: config.twitter.consumerKey,
      consumerSecret: config.twitter.consumerSecret,
      callbackURL: config.twitter.callbackURL
    },
    (accessToken, refreshToken, profile, done) =>
      findUserOrCreate(profile, done)
  )
);

function findUserOrCreate(profile, done) {
  var searchQuery = {
    name: profile.displayName
  };

  var updates = {
    name: profile.displayName,
    someID: profile.id,
    twitter: {
      displayName: profile.displayName,
      id: profile.id
    }
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
