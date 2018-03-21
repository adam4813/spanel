var express = require("express");
var passport = require("passport");
var router = express.Router();
var axios = require("axios");
var socialRouter = require("../social/socialRouter");

router.post("/api/social/post", function (req, res, next) {
  if (!req.user) {
    res.status(401).end();
  } else {
    socialRouter.postMessage(req.user, req.body.accounts, req.body.message);
    res.status(200).end();
  }
});

module.exports = router;
