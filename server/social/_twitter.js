var Twitter = require("twitter");

module.exports = function(user, message) {
  let client = new Twitter({
    consumer_key: process.env.twtConsumerKey,
    consumer_secret: process.env.twtConsumerSecret,
    access_token_key: user.token,
    access_token_secret: user.secret
  });
  client.post("statuses/update", { status: message }, function(
    error,
    tweet,
    response
  ) {
    if (error) throw error;
    console.log("Tweet id:" + tweet.id_str);
  });
};
