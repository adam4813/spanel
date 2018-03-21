var axios = require("axios");
var config = require("../config/_config");

var TwitchAPI = {
  postMessage: function (user, message) {
    axios
      .post(
      "https://api.twitch.tv/kraken/feed/" + user.twitch.id + "/posts",
      { content: message },
      {
        headers: {
          "Client-ID": config.twitch.clientID,
          Authorization: "OAuth " + user.twitch.token,
          "Content-Type": "application/json",
          Accept: "application/vnd.twitchtv.v5+json"
        }
      }
      )
      .then(response => {
        if (response.status == 200) {
          console.log("Feed id:" + response.data.post.id);
        }
      });
  }
};

module.exports = TwitchAPI;
