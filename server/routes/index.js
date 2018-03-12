var express = require("express");
var passport = require("passport");
var router = express.Router();
var axios = require("axios");
var user = require("../models/user");

router.get("/login", function (req, res, next) {
  res.send("Go back and register!");
});
router.get("/success", function (req, res, next) {
  res.redirect("http://localhost:3000/success");
});
router.get("/api/profile", function (req, res, next) {
  if (!req.user) {
    res.status(401);
  } else {
    res.json(req.user);
  }
});

router.get("/auth/twitter", passport.authenticate("twitter"));
router.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter", {
    successRedirect: "/success",
    failureRedirect: "/login"
  })
);

router.get("/auth/disconnect/twitter", function (req, res) {
  user.update(
    { _id: req.session.passport.user },
    {
      "twitter.token": undefined
    },
    function (err, numberAffected, rawResponse) {
      console.log("twitter updated");
    }
  );
  res.redirect("http://localhost:3000/success");
});

router.get("/auth/facebook", passport.authenticate("facebook"));
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/success",
    failureRedirect: "/login"
  })
);

router.get("/auth/disconnect/facebook", function (req, res) {
  axios
    .delete(
    "https://graph.facebook.com/v2.12/" +
    req.user.facebook.id +
    "/permissions?method=delete&access_token=" +
    req.user.facebook.token
    )
    .then(response => {
      if (response.status == 200) {
        user.update(
          { _id: req.session.passport.user },
          {
            "facebook.token": undefined
          },
          function (err, numberAffected, rawResponse) {
            console.log("facebook updated");
          }
        );
      }
      res.redirect("http://localhost:3000/success");
    });
});

router.get("/auth/google", passport.authenticate("google"));
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/success",
    failureRedirect: "/login"
  })
);

router.get("/auth/disconnect/google", function (req, res) {
  axios
    .get(
    "https://accounts.google.com/o/oauth2/revoke?token=" +
    req.user.google.token
    )
    .then(response => {
      if (response.status == 200) {
        user.update(
          { _id: req.session.passport.user },
          {
            "google.token": undefined
          },
          function (err, numberAffected, rawResponse) {
            console.log("google updated");
          }
        );
      }
      res.redirect("http://localhost:3000/success");
    });
});

module.exports = router;
