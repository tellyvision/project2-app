var db = require("../models");

module.exports = function(app) {
  // Get/request all art 
  app.get("/api/gallery", function(req, res) {
    db.gallery.findAll({}).then(function(dbgallery) {
      res.json(dbgallery);
    });
  });

  // Create a new art in gallery
  app.post("/api/postArt", function(req, res) {
    db.gallery.create(req.body).then(function(dbgallery) {
      res.json(dbgallery);
    });
  });

  // Delete an  by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
