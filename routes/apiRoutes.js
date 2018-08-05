var db = require("../models");

module.exports = function(app) {
  ////ARTPOSTS
  //Get all Artposts by artist if using search bar, or all if just browse
  //Get all Artposts by id if updating
  //Sorts by descending id # (therefore displaying Most Recent First)
  app.get("/api/artposts", function(req, res) {
    var query = {};
    if (req.query.artposts_artist) {
      query.artist = req.query.artposts_artist;
    }
    if (req.query.artposts_id) {
      query.id = req.query.artposts_id;
    }
    db.artposts
      .findAll({
        where: query,
        order: [["id", "DESC"]]
      })
      .then(function(dbArtposts) {
        res.json(dbArtposts);
      });
  });

  //Create a new Artpost
  app.post("/api/artposts", function(req, res) {
    db.artposts.create(req.body).then(function(dbArtposts) {
      res.json(dbArtposts);
    });
  });

  //Delete an Artpost by id
  app.delete("/api/artposts/:id", function(req, res) {
    db.artposts
      .destroy({ where: { id: req.params.id } })
      .then(function(dbArtposts) {
        res.json(dbArtposts);
      });
  });

  //Edit a Artpost
  app.put("/api/artposts/", function(req, res) {
    db.artposts
      .update(req.body, {
        where: {
          id: req.body.id
        }
      })
      .then(function(dbArtpost) {
        res.json(dbArtpost);
      });
  });

  ////BIDS
  //Get all bids with "artpostID" = artposts.id
  //Sorts by descending bidAmount (therefore displaying Highest Bid First)
  app.get("/api/bids", function(req, res) {
    var query = {};
    if (req.query.bids_artpostId) {
      query.artpostId = req.query.bids_artpostId;
    }
    db.bids
      .findAll({
        where: query,
        order: [["bidAmount", "DESC"]]
      })
      .then(function(dbBids) {
        res.json(dbBids);
      });
  });

  //Create New Bids
  app.post("/api/bids", function(req, res) {
    db.bids.create(req.body).then(function(dbbids) {
      res.json(dbbids);
    });
  });

  ////Comments
  //Get all comments with "artpostID" = artposts.id
  //Sorts by descending id # (therefore displaying Most Recent First)
  app.get("/api/comments", function(req, res) {
    var query = {};
    if (req.query.comments_artpostId) {
      query.artpostId = req.query.comments_artpostId;
    }
    db.comments
      .findAll({
        where: query,
        order: [["id", "DESC"]]
      })
      .then(function(dbComments) {
        res.json(dbComments);
      });
  });

  // Create a Comment
  app.post("/api/comments", function(req, res) {
    db.comments.create(req.body).then(function(dbComments) {
      res.json(dbComments);
    });
  });

  //LOGINSLOGINSLOGINSLOGINSLOGINS
  //create new login
  app.post("/api/posts", function(req, res) {
    console.log(req.body);
    db.Postinfo.create({
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
