var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var User = new Schema({
  accounts: [
    {
      provider: String,
      id: String,
      token: String,
      email: String,
      name: String,
      secret: String
    }
  ]
});

module.exports = mongoose.model("users", User);
