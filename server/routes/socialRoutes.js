var express = require("express");
var passport = require("passport");
var router = express.Router();
var axios = require("axios");
var socialRouter = require("../social/socialRouter");

router.post("/api/social/post", function (req, res, next) {
  if (!req.user) {
    res.status(401).end();
  } else {
    socialRouter.postMessage(
      "facebook",
      req.user.facebook.token,
      req.body.message
    );
    res.status(200).end();
  }
});

module.exports = router;
