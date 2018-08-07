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
};
