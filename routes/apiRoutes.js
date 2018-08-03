var db = require("../models");

module.exports = function(app) {
  //ARTPOSTSARTPOSTSARTPOSTSARTPOSTS
  // Get all artposts
  app.get("/api/artposts", function(req, res) {
    db.artposts.findAll({}).then(function(dbArtposts) {
      res.json(dbArtposts);
    });
  });

  // Create a new Artpost
  app.post("/api/artposts", function(req, res) {
    db.artposts.create(req.body).then(function(dbArtpost) {
      res.json(dbArtpost);
    });
  });

  // Delete an Artpost by id
  app.delete("/api/artposts/:id", function(req, res) {
    db.artposts
      .destroy({ where: { id: req.params.id } })
      .then(function(dbArtpost) {
        res.json(dbArtpost);
      });
  });

  //LOGINSLOGINSLOGINSLOGINSLOGINS
  //create new login
  app.post("/api/posts", function(req, res) {
    console.log(req.body);
    db.Post.create({
      name: req.body.name,
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // Delete an  by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });

  // Delete an post by an name
  app.delete("/api/posts/:name", function(req, res) {
    db.Post.destroy({
      where: {
        name: req.params.name
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
};
