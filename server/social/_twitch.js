var axios = require("axios");

module.exports = function(user, message) {
  axios
    .post(
      "https://api.twitch.tv/kraken/feed/" + user.id + "/posts",
      { content: message },
      {
        headers: {
          "Client-ID": process.env.twchClientID,
          Authorization: "OAuth " + user.token,
          "Content-Type": "application/json",
          Accept: "application/vnd.twitchtv.v5+json"
        }
      }
    )
    .then(response => {
      if (response.status === 200) {
        console.log("Feed id:" + response.data.post.id);
      }
    });
};
