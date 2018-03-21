var Twitter = require("twitter");
var config = require("../config/_config");

var TwitterAPI = {
  postMessage: function(user, message) {
    let client = new Twitter({
      consumer_key: config.twitter.consumerKey,
      consumer_secret: config.twitter.consumerSecret,
      access_token_key: user.twitter.token,
      access_token_secret: user.twitter.secret
    });
    client.post("statuses/update", { status: message }, function(
      error,
      tweet,
      response
    ) {
      if (error) throw error;
      console.log("Tweet id:" + tweet.id_str);
    });
  }
};

module.exports = TwitterAPI;
