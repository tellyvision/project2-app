// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var express = require('express');

var db = require("../models");



module.exports = function(app) {

  app.get('/', function(req,res){
    res.render('main');
  })

  app.get('/login', function(req, res){
    res.render('login');
});

app.get('/register', function(req, res){
    res.render('index');
});

app.post('/register', function(req,res){

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


req.checkBody('name', 'Name is required').notEmpty();
req.checkBody('email', 'Email is required').notEmpty();
req.checkBody('email', 'Email is not  valid').isEmpty();
req.checkBody('username', 'Username is required').notEmpty();
req.checkBody('password', 'Password is required').notEmpty();
req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

     var errors = req.validationErrors();

     if(errors){
         res.render('index', {
             errors:errors
         });
     } else{
       console.log("passed");
     }
  

    //    
  // Load index page
  // app.get("/", function(req, res) {
  //   db.Example.findAll({}).then(function(dbExamples) {
  //     res.render("index", {
  //       msg: "Welcome!",
  //       examples: dbExamples
  //     });
  //   });
  // });

// Routes
// =============================================================

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
  // app.get("/example/:id", function(req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
});
};
