var db = require("../models");

module.exports = function(app) {
  // Load Index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  //Load Browse page (Incl. Search)
  app.get("/browse", function(req, res) {
    db.artposts
      .findAll({
        //Not sure why the sort in the API routes wasn't working
        //Did a literal query here instead
        order: db.sequelize.literal("id DESC")
      })
      .then(function() {
        res.render("browse");
      });
  });

  //Load page to Post New Art
  app.get("/postnew", function(req, res) {
    var query = {};
    if (req.query.artposts_id) {
      query.id = req.query.artposts_id;
    }
    db.artposts
      .findOne({
        where: query
      })
      .then(function() {
        res.render("postNew");
      });
  });

  // Load Individual Artpost page by id
  app.get("/artpost/:id", function(req, res) {
    db.artposts
      .findOne({ where: { id: req.params.id } })
      .then(function(dbArtposts) {
        res.render("artpost", {
          artposts: dbArtposts
        });
      });
  });

  // Load login page
  app.get("/login", function(req, res) {
    res.render("login");
  });

  // Load register page
  app.get("/register", function(req, res) {
    res.render("register");
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
