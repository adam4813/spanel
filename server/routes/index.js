var express = require("express");
var passport = require("passport");
var router = express.Router();

router.get("/login", function(req, res, next) {
  console.log("login");
  res.send("Go back and register!");
});

router.get("/auth/twitter", passport.authenticate("twitter"));
router.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter", {
    successRedirect: "http://localhost:3000/success",
    failureRedirect: "/login"
  })
);

module.exports = router;
