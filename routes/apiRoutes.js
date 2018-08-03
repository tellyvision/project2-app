var db = require("../models");

module.exports = function(app) {

  // Get all posts
  app.get("/api/posts", function(req, res) {
    db.Post.findAll().then(function(dbpost) {
      res.json(dbpost);
    }).catch(function(error){
      res.json('{"Error":could not find stuff}')
    })
  });

  // Get post by name
  app.get("/api/posts/:name", function(req, res) {
    db.Post.findAll({
      where: {
        name: req.params.name
      }
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });

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
  
  
  //Get route for retrieving a single post


  app.get("/api/posts/:name", function(req, res) {
    db.Post.findOne({
      where: {
        name: req.params.name
      }
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });


  // create new post 
  app.post("/api/posts", function(req, res) {
    console.log(req.body);
    db.Post.create({
      name: req.body.name,
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      password2:req.body.password2
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });

  // Delete an  by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });

  });

 

  // Delete an post by an name


  app.delete("/api/posts/:name", function(req, res) {
    db.Post.destroy({
      where: {
        name: req.params.name
      }
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.json(dbExample)
  //   });
  // });
};



