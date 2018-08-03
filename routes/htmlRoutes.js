var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/browse", function(req, res) {
    db.artposts.findAll({}).then(function(dbArtposts) {
      res.render("browse", {
        artposts: dbArtposts
      });
    });
  });

  app.get("/postnew", function(req, res) {
    res.render("postNew");
  });

  // Load Artpost page and pass in an Artpost by id
  app.get("/artpost/:id", function(req, res) {
    db.artposts
      .findOne({ where: { id: req.params.id } })
      .then(function(dbArtpost) {
        res.render("artpost", {
          artpost: dbArtpost
        });
      });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });

  //Logins & Other
  app.post("/register", function(req, res) {
    var name = req.body.name;
    var email = req.body.Email1;
    var username = req.body.username;
    var password = req.body.Password1;
    var password2 = req.body.Password2;
    console.log(name);
    console.log(email);
    console.log(username);
    console.log(password);
    console.log(password2);
    req.checkBody("name", "Name is required").notEmpty();
    req.checkBody("email", "Email is required").notEmpty();
    req.checkBody("email", "Email is not  valid").isEmpty();
    req.checkBody("username", "Username is required").notEmpty();
    req.checkBody("password", "Password is required").notEmpty();

    req
      .checkBody("password2", "Passwords do not match")
      .equals(req.body.password);

    var errors = req.validationErrors();

    if (errors) {
      res.render("index", {
        errors: errors
      });
    } else {
      console.log("passed");
    }
  });
};
