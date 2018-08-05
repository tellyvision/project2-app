// Get references to page elements
var $comment = $("#comment");
var $commentor = $("#commentor");
var $submitComment = $("#submitComment");
var $commentList = $("#commentList");
var commentposts;
var url = window.location.href;
var artpostId;

function commentInit() {
  if (url.indexOf("/artpost/") !== -1) {
    artpostId = url.split("/artpost/")[1];
    getComments(artpostId);
  }
}

//Display Initial Comments
commentInit();

function saveComment(comment) {
  return $.ajax({
    headers: {
      "Content-Type": "application/json"
    },
    type: "POST",
    url: "../api/comments",
    data: JSON.stringify(comment)
  });
}

function getComments(artpost) {
  artpostId = artpost || "";

  if (artpostId) {
    artpostId = "/?comments_artpostId=" + artpostId;
  }
  $.get("../api/comments" + artpostId, function(data) {
    console.log("comments", data);
    commentposts = data;
    if (!commentposts || !commentposts.length) {
      displayCommentsEmpty();
    } else {
      refreshComments();
    }
  });
}

//Refreshes appends comments
function refreshComments() {
  $commentList.empty();
  var commentpostsToAdd = [];
  for (var i = 0; i < commentposts.length; i++) {
    commentpostsToAdd.push(createNewCommentPost(commentposts[i]));
  }
  $commentList.append(commentpostsToAdd);
}

//Creates HTML for each individual comment
function createNewCommentPost(post) {
  var $p = $("<p>")
    .attr("comment-id", post.id)
    .addClass("indivComments");

  var $commentor = $("<b>").text("Posted by " + post.commentor);

  var $commentPlaced = $("<small>")
    .text(" on " + post.createdAt)
    .prepend($commentor);

  var $commentMsg = $("<p>").text(`" ${post.comment} "`);

  $p.append($commentMsg).append($commentPlaced);

  return $p;
}

function displayCommentsEmpty() {
  $commentList.empty();
  $commentList.text("No comments yet! Be the first by adding a comment below!");
}

//send new bid to database
var handleCommentSubmit = function(event) {
  event.preventDefault();

  artpostId = $(this)
    .parent()
    .attr("data-id");
  console.log(artpostId);
  var comment = {
    comment: $comment.val().trim(),
    commentor: $commentor.val().trim(),
    artpostId: artpostId
  };

  if (!(comment.comment && comment.commentor)) {
    alert("You must fill out all field forms!");
    return;
  }

  saveComment(comment).then(getComments(artpostId));

  $comment.val("");
  $commentor.val("");
  console.log(artpostId);
};

$submitComment.on("click", handleCommentSubmit);
