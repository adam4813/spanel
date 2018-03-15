var facebookAPI = require("./_fb");

var socialAPIs = {
  facebook: facebookAPI
};

var SocialAPIRouter = {
  postMessage: function (account, token, message) {
    if (socialAPIs[account]) {
      socialAPIs[account].postMessage(token, message);
    }
  }
};

module.exports = SocialAPIRouter;
