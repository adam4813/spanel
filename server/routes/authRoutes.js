var express = require("express");
var passport = require("passport");
var router = express.Router();
var axios = require("axios");
var User = require("../models/user");

router.get("/twitter", passport.authenticate("twitter"));
router.get(
  "/twitter/callback",
  passport.authenticate("twitter", {
    successRedirect: "/api/success",
    failureRedirect: "/api/login"
  })
);
router.get("/connect/twitter", passport.authorize("twitter"));

router.get("/disconnect/twitter", function(req, res) {
  User.update(
    {
      _id: req.session.passport.user,
      accounts: {
        $elemMatch: {
          provider: "twitter"
        }
      }
    },
    {
      $set: { "accounts.$.token": undefined, "accounts.$.secret": undefined }
    },
    function(err, numberAffected, rawResponse) {
      console.log("twitter updated");
    }
  );
  res.redirect("/api/success");
});

router.get("/facebook", passport.authenticate("facebook"));
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/api/success",
    failureRedirect: "/api/login"
  })
);
router.get("/connect/facebook", passport.authorize("facebook"));

router.get("/disconnect/facebook", function(req, res) {
  let index = req.user.accounts.findIndex(element => {
    return element.provider === "facebook";
  });
  axios
    .delete(
      "https://graph.facebook.com/v2.12/" +
        req.user.accounts[index].id +
        "/permissions?method=delete&access_token=" +
        req.user.accounts[index].token
    )
    .then(response => {
      if (response.status === 200) {
        User.update(
          {
            _id: req.session.passport.user,
            accounts: {
              $elemMatch: {
                provider: "facebook"
              }
            }
          },
          {
            $set: { "accounts.$.token": undefined }
          },
          function(err, numberAffected, rawResponse) {
            console.log("facebook updated");
          }
        );
      }
      res.redirect("/api/success");
    });
});

router.get("/google", passport.authenticate("google"));
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/api/success",
    failureRedirect: "/api/login"
  })
);
router.get("/connect/google", passport.authorize("google"));

router.get("/disconnect/google", function(req, res) {
  let index = req.user.accounts.findIndex(element => {
    return element.provider === "google";
  });
  axios
    .get(
      "https://accounts.google.com/o/oauth2/revoke?token=" +
        req.user.accounts[index].token
    )
    .then(response => {
      if (response.status === 200) {
        User.update(
          {
            _id: req.session.passport.user,
            accounts: {
              $elemMatch: {
                provider: "google"
              }
            }
          },
          {
            $set: { "accounts.$.token": undefined }
          },
          function(err, numberAffected, rawResponse) {
            console.log("google updated");
          }
        );
      }
      res.redirect("/api/success");
    });
});

router.get("/twitch", passport.authenticate("twitch"));
router.get(
  "/twitch/callback",
  passport.authenticate("twitch", {
    successRedirect: "/api/success",
    failureRedirect: "/api/login"
  })
);
router.get("/connect/twitch", passport.authorize("twitch"));

router.get("/disconnect/twitch", function(req, res) {
  let index = req.user.accounts.findIndex(element => {
    return element.provider === "twitch";
  });
  axios
    .post(
      "https://id.twitch.tv/oauth2/revoke?client_id=" +
        process.env.twchClientID +
        "&token=" +
        req.user.accounts[index].token
    )
    .then(response => {
      if (response.status === 200) {
        User.update(
          {
            _id: req.session.passport.user,
            accounts: {
              $elemMatch: {
                provider: "twitch"
              }
            }
          },
          {
            $set: { "accounts.$.token": undefined }
          },
          function(err, numberAffected, rawResponse) {
            console.log("twitch updated");
          }
        );
      }
      res.redirect("/api/success");
    });
});

module.exports = router;
