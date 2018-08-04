var $artposting = $("#artposting");

// The API object contains methods for each kind of request we'll make
var API = {
  deleteArtpost: function(id) {
    return $.ajax({
      url: "../api/artposts/" + id,
      type: "DELETE"
    });
  }
};

var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  window.onload = function() {
    window.location.href = "/browse";
  };

  API.deleteArtpost(idToDelete).then(function() {
    window.onload();
  });
};

$artposting.on("click", ".delete", handleDeleteBtnClick);
