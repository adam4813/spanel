const express = require("express");
const app = express();

// Session and database
var session = require("express-session");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb://spanel:abcd1234@ds249798.mlab.com:49798/spanel");

const MongoStore = require('connect-mongo')(session);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser("keyboard cat"));
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: {
      maxAge: 7 * 24 * 3600 * 1000
    },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      autoRemove: 'disabled'
    })
  })
);

// Passport for login
var passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());
require("./config/_passport")(passport); // passport strategies

// Routing
var apiRoutes = require("./routes/apiRoutes");
app.use("/api", apiRoutes);
var authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
var socialRoutes = require("./routes/socialRoutes");
app.use("/api/social", socialRoutes);
app.use(express.static("build"));
// App init
app.set("port", process.env.PORT || 3001);

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
