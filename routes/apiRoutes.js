var db = require("../models");

module.exports = function(app) {
  // Get/request all art 
  app.get("/api/gallery", function(req, res) {
    db.postArt.findAll({}).then(function(dbgallery) {
      res.json(dbgallery);
    });
  });

  // Create a new art in gallery
  app.post("/api/gallery", function(req, res) {
    console.log("Called");
    db.gallery.create(req.body).then(function(dbgallery) {
      // res.json(dbgallery);
      res.redirect('/browse')
    });

  });

  // Delete an by id
  app.delete("/api/gallery/:id", function(req, res) {
    db.gallery.destroy({ where: { id: req.params.id } }).then(function(dbgallery) {
      res.json(dbgallery);
    });
  });
};
