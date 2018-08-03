$(document).ready(function() {
    "use strict";

console.log("jvscrip loaded");

// Get references to page elements
var $artTitle = $("#artTitle");
var $artURL = $("#artURL");
var $artistName = $("#artistName");
var $submitBtn = $("#submit");


// The API object contains methods for each kind of request we'll make
var API = {
  savenewArt: function(newArt) {
    return $.ajax({ 
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/gallery",
      data: JSON.stringify(newArt)
    });
  },
};



// postArtFormSubmit is called whenever we submit a new art
// Save the new art to the db and refresh the list
var postArtFormSubmit = function(event) {
  event.preventDefault();

  console.log("onclick");

  var newArt = {
    artTitle: $artTitle.val().trim(),
    artURL: $artURL.val().trim(),
    artistName: $artistName.val().trim()
  };

  if (!(newArt.artTitle && newArt.artURL && newArt.artistName)) {
    alert("You must enter the title of your art work, the link and name of the artist!");
    return;
  }

  API.savenewArt(newArt);

  $artTitle.val("");
  $artURL.val("");
  $artistName.val("");

};



// Add event listeners to the submit and delete buttons
$('body').on("click", "#submit", postArtFormSubmit);


});