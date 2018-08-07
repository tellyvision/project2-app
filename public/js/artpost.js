var $artinfo = $("#postFooter");

var API = {
  deleteArtpost: function(id) {
    return $.ajax({
      url: "../api/artposts/" + id,
      type: "DELETE"
    });
  }
};

function handleEditClick() {
  var idToEdit = $(this)
    .parent()
    .attr("data-id");
  console.log(idToEdit);
  window.location.href = "/postNew?artpost_id=" + idToEdit;
}

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

$artinfo.on("click", ".delete", handleDeleteBtnClick);
$artinfo.on("click", ".edit", handleEditClick);
