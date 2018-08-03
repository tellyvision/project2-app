// Get references to page elements
var $artpostTitle = $("#artpostTitle");
var $artpostArtist = $("#artpostArtist");
var $artpostURL = $("#artpostURL");
var $submitBtn = $("#submit");
// var $artpostList = $("#artpostList");

// The API object contains methods for each kind of request we'll make
var API = {
  saveArtpost: function(artpost) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/artposts",
      data: JSON.stringify(artpost)
    });
  }
};

var handleFormSubmit = function(event) {
  event.preventDefault();

  var artpost = {
    title: $artpostTitle.val().trim(),
    artist: $artpostArtist.val().trim(),
    URL: $artpostURL.val().trim()
  };

  window.onload = function() {
    window.location.href = "/browse";
  };

  if (!(artpost.title && artpost.artist && artpost.URL)) {
    alert("You must fill out all field forms!");
    return;
  }

  API.saveArtpost(artpost).then(function() {
    window.onload();
  });

  $artpostTitle.val("");
  $artpostArtist.val("");
  $artpostURL.val("");
};

$submitBtn.on("click", handleFormSubmit);
