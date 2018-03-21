var FB = require("fb");

var FacebookAPI = {
  postMessage: function (user, message) {
    FB.api(
      "me/feed",
      "post",
      { message: message, access_token: user.facebook.token },
      function (res) {
        if (!res || res.error) {
          console.log(!res ? "error occurred" : res.error);
          return;
        }
        console.log("Post Id: " + res.id);
      }
    );
  }
};

module.exports = FacebookAPI;
