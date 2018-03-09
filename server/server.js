const express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var passport = require("passport");
var mongoose = require("mongoose");
const app = express();

var routes = require("./routes/index.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./auth/_passport");

app.use("/", routes);

app.set("port", process.env.PORT || 3001);

mongoose.connect("mongodb://spanel:abcd1234@ds249798.mlab.com:49798/spanel");

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
