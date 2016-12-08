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
  return "<div id='video-placeholder''><p class='js-thumbnail'> <a href='https://www.youtube.com/watch?v=" + item.id.videoId + "'/a> <img src=" + item.snippet.thumbnails.medium.url + "> </p>" + "<p class='js-titleLink'>" + item.snippet.title + "</p></div>";
}   

function lightBoxClick(target) {
  target.click(function(){
    target.toggle(addClass($(".js-lightbox")));
  });
}

function displayYouTubeSearchData(data) {
  var resultElement = "";       
  if (data.items.length) {
    resultElement = data.items.map(renderYouTubeItem).join("");
  } else {
    resultElement = "<p> No results </p>";
  }
   $(".js-search-results").html(resultElement);
   lightBoxClick($(".js-search-results"));  
}
    
function watchSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    var query = $(this).find('.js-query').val();
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(function(){watchSubmit();});

