var youTubeURL = 'https://www.googleapis.com/youtube/v3/search',
    keyID = 'AIzaSyDacy8AaWzq82g-Oq4Ej4ogJFCCMlCC5As',
    youTubeVideoId = "";


function getDataFromApi(searchTerm, callback) {
    var settings = {
        url: youTubeURL,
        data: {
            key: keyID,
            part: 'snippet',
            q: searchTerm,
        },
        dataType: 'json',
        type: 'GET',
        success: callback
    };
    $.ajax(settings);
}

function renderYouTubeItem(item) {
    return "<div class=videoWrapper> <a href='https://www.youtube.com/watch?v=" + item.id.videoId + "'data-titlestyle='right' data-width='600' data-height='400' class='html5lightbox'> <img src=" + item.snippet.thumbnails.medium.url + "></a>" + "<p class='js-titleLink'>" + item.snippet.title + "</p></div>";
}

function displayYouTubeSearchData(data) {
    var resultElement = "";
    if (data.items.length) {
        resultElement = data.items.map(renderYouTubeItem).join("");
    } else {
        resultElement = "<p> No results </p>";
    }
    $(".js-search-results").append(resultElement);
}

function watchSubmit() {
    $('.js-search-form').submit(function(e) {
        $(".js-search-results").empty();
        e.preventDefault();
        var query = $(this).find('.js-query').val();
        getDataFromApi(query, displayYouTubeSearchData);
    });
}

$(function() {
    watchSubmit();
});
