// Get references to page elements
// var $artpostTitle = $("#artpostTitle");
// var $artpostArtist = $("#artpostArtist");
// var $artpostURL = $("#artpostURL");
// var $submitBtn = $("#submit");
var $artpostList = $("#artpostList");

// The API object contains methods for each kind of request we'll make
var API = {
  getArtposts: function() {
    return $.ajax({
      url: "api/artposts",
      type: "GET"
    });
  },
  deleteArtpost: function(id) {
    return $.ajax({
      url: "api/artposts/" + id,
      type: "DELETE"
    });
  }
};

// postArt gets artposts from the db and populates the list
var postArt = function() {
  API.getArtposts().then(function(data) {
    var $artposts = data.map(function(artposts) {
      var $a = $("<a>")
        .title(artposts.title)
        .attr("href", "/artpost/" + artposts.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": artposts.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .title("ｘ");

      $li.append($button);

      return $li;
    });
    $artpostList.empty();
    $artpostList.append($artposts);
  });
};
postArt();
