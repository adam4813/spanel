var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var User = new Schema({
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  twitter: {
    id: String,
    token: String,
    displayName: String,
    username: String,
    secret: String
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String
  }
});

module.exports = mongoose.model("users", User);
