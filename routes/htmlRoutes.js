// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var express = require('express');

var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

// Each of the below routes just handles the HTML page that the user gets sent to.


  //  post route loads post.handlebars page
    app.get('/post', function(req, res){
    res.render('post');
    });

  //  comment route loads comment.handlebars page
    app.get('/comment', function(req, res){
      res.render('comment');
      });


  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
