var facebookAPI = require("./_fb");
var twitterAPI = require("./_twitter");

var socialAPIs = {
  facebook: facebookAPI,
  twitter: twitterAPI
};

var SocialAPIRouter = {
  postMessage: function (user, accounts, message) {
    for (account in accounts) {
      if (socialAPIs[accounts[account]]) {
        socialAPIs[accounts[account]].postMessage(user, message);
      }
    }
  }
};

module.exports = SocialAPIRouter;
