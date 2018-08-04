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

// refreshArtposts gets artposts from the db and populates the list
var refreshArtposts = function() {
  API.getArtposts().then(function(data) {
    var $artposts = data.map(function(artposts) {
      var $button = $("<button>")
        .addClass("btn btn-sm btn-danger float-right delete")
        .text("ｘ");

      var $artimg = $("<img>").attr({
        class: "artimg",
        src: artposts.URL
      });

      var $a = $("<a>")
        .text(artposts.title)
        .attr("href", "/artpost/" + artposts.id);

      var $divcardbody = $("<div>")
        .attr({
          "data-id": artposts.id,
          class: "card-body"
        })
        .append($a)
        .append($button);

      var $divcard = $("<div>")
        .attr({
          class: "card mt-4"
        })
        .append($artimg)
        .append($divcardbody);

      var $divcol = $("<div>").attr({
        class: "col-lg-3 animated fadeIn"
      });

      $divcol.append($divcard);

      return $divcol;
    });
    $artpostList.empty();
    $artpostList.append($artposts);
  });
};

var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteArtpost(idToDelete).then(function() {
    refreshArtposts();
  });
};

$artpostList.on("click", ".delete", handleDeleteBtnClick);
