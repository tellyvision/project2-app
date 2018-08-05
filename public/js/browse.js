var $artpostList = $("#artpostList");
var posts;
var url = window.location.search;
var artistName;

// looks for a query in URL
if (url.indexOf("?artposts_artist=") !== -1) {
  artistName = url.split("=")[1];
  getArtposts(artistName);
}
// If there's no query, all posts will populate
else {
  getArtposts();
}

//Get from database
function getArtposts(artist) {
  artistName = artist || "";
  if (artistName) {
    artistName = "/?artposts_artist=" + artistName;
  }

  $.get("/api/artposts" + artistName, function(data) {
    posts = data;
    if (!posts || !posts.length) {
      displayEmpty(artist);
    } else {
      refreshArtposts();
    }
  });
}

//Deletes from database
function deleteArtpost(id) {
  return $.ajax({
    url: "api/artposts/" + id,
    type: "DELETE"
  });
}

function refreshArtposts() {
  $artpostList.empty();
  var $artposts = [];
  for (var i = 0; i < posts.length; i++) {
    $artposts.push(createNewPost(posts[i]));
  }
  console.log($artposts);
  $artpostList.append($artposts);
}

function createNewPost(post) {
  var $button = $("<button>")
    .addClass("btn btn-sm btn-danger float-right delete")
    .text("ｘ");

  var $artimg = $("<img>").attr({
    class: "artimg",
    src: post.URL
  });

  var $aimg = $("<a>")
    .attr("href", "/artpost/" + post.id)
    .append($artimg);

  var $a = $("<a>")
    .text(post.title + " by " + post.artist)
    .attr("href", "/artpost/" + post.id);

  var $divcardbody = $("<div>")
    .attr({
      "data-id": post.id,
      class: "card-body"
    })
    .append($a)
    .append($button);

  var $divcard = $("<div>")
    .attr({
      class: "card mt-4"
    })
    .append($aimg)
    .append($divcardbody);

  var $divcol = $("<div>").attr({
    class: "col-lg-3 animated fadeIn"
  });

  $divcol.append($divcard);

  return $divcol;
}

function displayEmpty(id) {
  $artpostList.empty();
  $artpostList.text("No posts yet from " + id + "!");
  console.log(id);
}

var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  deleteArtpost(idToDelete).then(function() {
    getArtposts(artistName);
  });
};

$artpostList.on("click", ".delete", handleDeleteBtnClick);
