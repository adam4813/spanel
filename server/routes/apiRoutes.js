var express = require("express");
var passport = require("passport");
var router = express.Router();
var axios = require("axios");
var user = require("../models/user");

router.get("/login", function (req, res, next) {
  res.status(401).end();
});
router.get("/success", function(req, res, next) {
  res.redirect("/");
});
router.get("/profile", function(req, res, next) {
  if (!req.user) {
    res.status(401).end();
  } else {
    res.json(req.user);
  }
});

module.exports = router;
