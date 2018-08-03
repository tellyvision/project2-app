// // Get references to page elements
// var $artpostTitle = $("#artpostTitle");
// var $artpostArtist = $("#artpostArtist");
// var $artpostURL = $("#artpostURL");
// var $submitBtn = $("#submit");
// var $artpostList = $("#artpostList");

// // The API object contains methods for each kind of request we'll make
// var API = {
//   saveArtpost: function(artpost) {
//     return $.ajax({
//       headers: {
//         "Content-Type": "application/json"
//       },
//       type: "POST",
//       url: "api/artposts",
//       data: JSON.stringify(artpost)
//     });
//   },
//   getArtposts: function() {
//     return $.ajax({
//       url: "api/artposts",
//       type: "GET"
//     });
//   },
//   deleteArtpost: function(id) {
//     return $.ajax({
//       url: "api/artposts/" + id,
//       type: "DELETE"
//     });
//   }
// };

// // refreshArtposts gets new artposts from the db and repopulates the list
// var refreshArtposts = function() {
//   API.getArtposts().then(function(data) {
//     var $artposts = data.map(function(artpost) {
//       var $a = $("<a>")
//         .title(artpost.title)
//         .attr("href", "/artpost/" + artpost.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": artpost.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .title("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $artpostList.empty();
//     $artpostList.append($artposts);
//   });
// };

// // handleFormSubmit is called whenever we submit a new artpost
// // Save the new artpost to the db and refresh the list
// var handleFormSubmit = function(event) {
//   event.preventDefault();

//   var artpost = {
//     title: $artpostTitle.val().trim(),
//     artist: $artpostArtist.val().trim(),
//     URL: $artpostURL.val().trim()
//   };

//   if (!(artpost.title && artpost.artist && artpost.URL)) {
//     alert("You must enter a Title and provide a URL link to your art");
//     return;
//   }

//   API.saveArtpost(artpost).then(function() {
//     refreshArtposts();
//   });

//   $artpostTitle.val("");
//   $artpostArtist.val("");
//   $artpostURL.val("");
// };

// // handleDeleteBtnClick is called when an artpost's delete button is clicked
// // Remove the artpost from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteArtpost(idToDelete).then(function() {
//     refreshArtposts();
//   });
// };

// // Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $artpostList.on("click", ".delete", handleDeleteBtnClick);
