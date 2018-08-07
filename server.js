
var env = require("dotenv").config();

var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");

var passport   = require('passport')
var session = require('express-session');


var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;
app.use("/js", express.static("./public/js"));
app.use("/css", express.static("./public/styles"));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var exphbs = require("express-handlebars");

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");


// For Passport
 
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
 
app.use(passport.initialize());
 
app.use(passport.session()); // persistent login sessions

var models = require("./models");
var authRoute = require('./routes/auth.js')(app,passport);

//load passport strategies

require('./config/passport.js')(passport, models.user);

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});



module.exports = app;
