var express = require("express");
var passport = require("passport");
var router = express.Router();
var axios = require("axios");
var user = require("../models/user");
var config = require("../config/_config");

router.get("/login", function(req, res, next) {
  res.send("Go back and register!");
});
router.get("/success", function(req, res, next) {
  res.redirect("http://localhost:3000/success");
});
router.get("/api/profile", function(req, res, next) {
  if (!req.user) {
    res.status(401);
  } else {
    res.json(req.user);
  }
});

module.exports = router;
