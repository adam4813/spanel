var express = require("express");
var router = express.Router();
var apiProxy = require("../social/apiProxy");

router.post("/post", function(req, res, next) {
  if (!req.user) {
    res.status(401).end();
  } else {
    apiProxy.postMessage(req.user, req.body.accounts, req.body.messageList);
    res.status(200).end();
  }
});

module.exports = router;
