var express = require("express");
var passport = require("passport");
var router = express.Router();

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

router.get("/auth/facebook", passport.authenticate("facebook"));
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/success",
    failureRedirect: "/login"
  })
);

router.get("/auth/google", passport.authenticate("google"));
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/success",
    failureRedirect: "/login"
  })
);

module.exports = router;
