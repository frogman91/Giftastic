var buttonName = ["zelda", "link", "ganondorf", "epona", "urbosa", "dark link", "great deku tree", "zant", "navi", "impa", "great fairy"]
var cleared;


function clearGif() {
    if (cleared === false) {
        cleared = true;
        $("#gifResults div").empty();
    }
};

function updateButtons() {
    $("#buttons").empty();
    for (var i = 0; i < buttonName.length; i++) {
        $("#buttons").append("<button class='button' data='" + buttonName[i] + "'>" +
            buttonName[i] + "</button>");
    }
}

updateButtons();


$("#submit").on("click", function(event) {

    event.preventDefault();

    if ($("#search").val() != "") {
        var newSearch = $("#search").val().trim();
        buttonName.push(newSearch);
        updateButtons();
        $("#search").val() = "";
    }
});


$("body").on("click", "button", function() {
    var zelda = $(this).attr("data");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        zelda + "&api_key=02a62aa40d354a8c98846683add9bdd4&limit=4";

    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function(response) {
            clearGif();
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class='item' class='gif'>");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var zeldaImage = $("<img class='gif' data-state='still' urlStill='" + results[i].images.original_still.url + "' urlAnim='" + results[i].images.original.url + "'>");

                imageStill = zeldaImage.attr("src", results[i].images.original_still.url);

                gifDiv.append(p);
                gifDiv.append(zeldaImage);

                $("#gifResults").append(gifDiv);
                cleared = false;
            }
        });
});

$("body").on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    console.log(this);
    if (state === "still") {
        $(this).attr("src", $(this).attr("urlAnim"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("urlStill"));
        $(this).attr("data-state", "still");
    }
});