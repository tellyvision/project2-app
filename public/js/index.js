var $searchArtist = $("#searchArtist");
var $submitSearchBtn = $("#submitSearch");
var artistSearch;

//handles search bar on all pages
var handleFormSubmit = function(event) {
  event.preventDefault();

  artistSearch = $searchArtist.val().trim();

  window.onload = function() {
    window.location.href = "/browse/?artposts_artist=" + artistSearch;
  };
  window.onload();
};

$submitSearchBtn.on("click", handleFormSubmit);

//CREATES A LIST OF ARTISTS ---NOT ACTIVE--

// getArtists();

// function getArtists() {
//   $.get("/api/artposts", renderArtistList);
// }

// function renderArtistList(data) {
//   if (!data.length) {
//     window.location.href = "/browse";
//   }
//   var rowsToAdd = [];
//   for (var i = 0; i < data.length; i++) {
//     rowsToAdd.push(createArtistRow(data[i]));
//   }
//   $searchArtist.empty();
//   console.log(rowsToAdd);
//   console.log($searchArtist);
//   $searchArtist.append(rowsToAdd);
//   $searchArtist.val(authorId);
// }

// function createArtistRow(artposts) {
//   var listOption = $("<option>");
//   listOption.attr("value", artposts.artist);
//   listOption.text(artposts.artist);
//   return listOption;
// }
