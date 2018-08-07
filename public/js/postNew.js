var $artpostTitle = $("#artpostTitle");
var $artpostArtist = $("#artpostArtist");
var $artpostURL = $("#artpostURL");
var $submitBtn = $("#submit");
var $h = $("h3");
var artpostId;
var url = window.location.href;
var updating = false;

if (url.indexOf("?artpost_id=") !== -1) {
  artpostId = url.split("=")[1];
  getPostData(artpostId);
  $h.text("Edit Post");
  console.log(artpostId);
} else {
  console.log(url.indexOf("?artposts_id="));
}

function getPostData(id) {
  var queryUrl = "/api/artposts/?artposts_id=" + id;
  $.get(queryUrl, function(data) {
    if (data) {
      data = data[0];

      // If this post exists, populates form witgh current data
      $artpostTitle.val(data.title);
      $artpostArtist.val(data.artist);
      $artpostURL.val(data.URL);
      artpostId = data.id;
      updating = true;
    }
  });
}

// The API object contains methods
var API = {
  saveArtpost: function(artpost) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/artposts",
      data: JSON.stringify(artpost)
    }).then(function() {
      window.location.href = "/browse";
    });
  },
  updateArtpost: function(artpost) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "PUT",
      url: "/api/artposts",
      data: JSON.stringify(artpost)
    }).then(function() {
      window.location.href = "/browse";
    });
  }
};

var handleFormSubmit = function(event) {
  event.preventDefault();
  console.log(artpostId);
  var artpost = {
    title: $artpostTitle.val().trim(),
    artist: $artpostArtist.val().trim(),
    URL: $artpostURL.val().trim()
  };

  if (!(artpost.title && artpost.artist && artpost.URL)) {
    alert("You must fill out all field forms!");
    return;
  } else if (updating) {
    artpost.id = artpostId;
    API.updateArtpost(artpost);
    console.log(artpost.id);
    console.log(artpostId);
  } else {
    API.saveArtpost(artpost);
  }
};

$submitBtn.on("click", handleFormSubmit);
