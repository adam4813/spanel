var facebookEndpoints = require("./_fb");
var twitterEndpoints = require("./_twitter");
var twitchEndpoints = require("./_twitch");

var endpoints = {
  facebook: facebookEndpoints,
  twitter: twitterEndpoints,
  twitch: twitchEndpoints
};

var ApiProxy = {
  postMessage: function(user, accounts, message) {
    for (var account in accounts) {
      let index = user.accounts.findIndex(element => {
        return element._id.toString() === accounts[account];
      });
      if (index > -1) {
        if (endpoints[user.accounts[index].provider]) {
          endpoints[user.accounts[index].provider](
            user.accounts[index],
            message
          );
        }
      }
    }
  }
};

module.exports = ApiProxy;
