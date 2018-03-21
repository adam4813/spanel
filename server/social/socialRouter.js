var facebookAPI = require("./_fb");
var twitterAPI = require("./_twitter");
var twitchAPI = require("./_twitch");

var socialAPIs = {
  facebook: facebookAPI,
  twitter: twitterAPI,
  twitch: twitchAPI
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
