// Get references to page elements
var $bidAmount = $("#bidAmount");
var $bidder = $("#bidder");
var $submitBidBtn = $("#submitBid");
var $bidList = $("#bidList");
var bidposts;
var url = window.location.href;
var artpostId;

function bidInit() {
  if (url.indexOf("/artpost/") !== -1) {
    artpostId = url.split("/artpost/")[1];
    getBids(artpostId);
  }
}

//Display Initial Bids
bidInit();

//Saves bid in database
function saveBid(bid) {
  return $.ajax({
    headers: {
      "Content-Type": "application/json"
    },
    type: "POST",
    url: "../api/bids",
    data: JSON.stringify(bid)
  });
}

//Retrieves bid in database
function getBids(artpost) {
  artpostId = artpost || "";

  if (artpostId) {
    artpostId = "/?bids_artpostId=" + artpostId;
  }
  $.get("../api/bids" + artpostId, function(data) {
    console.log("bids", data);
    bidposts = data;
    if (!bidposts || !bidposts.length) {
      displayEmpty();
    } else {
      refreshBids();
    }
  });
}

//Refreshes and appends bids to table
function refreshBids() {
  $bidList.empty();
  var bidpostsToAdd = [];
  for (var i = 0; i < bidposts.length; i++) {
    bidpostsToAdd.push(createNewBidpost(bidposts[i]));
  }
  var $tableHeadings = $("<tr>")
    .append("<th>Bid Amount</th>")
    .append("<th>Bidder</th>")
    .append("<th>Bid Placed On</th>");

  var $bidTable = $("<table>")
    .append($tableHeadings)
    .append(bidpostsToAdd);

  $bidList.append($bidTable);
}

//Creates HTML for each individual bid
function createNewBidpost(post) {
  var $p = $("<tr>").attr("bid-id", post.id);

  var $bidPlaced = $("<td>").text(post.createdAt);

  var $bidder = $("<td>").text(post.bidder);

  var $amount = $("<td>").text("$ " + post.bidAmount);

  $p.append($amount)
    .append($bidder)
    .append($bidPlaced);

  return $p;
}

// If nothing in database, bid section on page will say this
function displayEmpty() {
  $bidList.empty();
  $bidList.text("No bids yet! Be the first by adding a bid below!");
}

//Saves values to var and evokes save to db function and repopulates page
var handleBidSubmit = function(event) {
  event.preventDefault();

  artpostId = $(this)
    .parent()
    .attr("data-id");
  console.log(artpostId);
  var bid = {
    bidAmount: $bidAmount.val().trim(),
    bidder: $bidder.val().trim(),
    artpostId: artpostId
  };

  if (!(bid.bidAmount && bid.bidder)) {
    alert("You must fill out all field forms!");
    return;
  }

  saveBid(bid).then(getBids(artpostId));

  $bidAmount.val("");
  $bidder.val("");
  console.log(artpostId);
};

//Handles submit button
$submitBidBtn.on("click", handleBidSubmit);
