

const state = {
  nextPage : 1,
  lastPageReached : false,

}
const searchFlickr = function(keywords, pageNo){
  if(state.lastPageReached ){
    return;
  }
  console.log('Serching for', keywords, pageNo);

  const flickrURL = "https://api.flickr.com/services/rest?jsoncallback=?";//JSONP
  $.getJSON(flickrURL,{
    method:'flickr.photos.search', //not to be consfused with HTTP methods like GET/POST
    api_key: '2f5ac274ecfac5a455f38745704ad084',
    text: keywords,
    format: 'json',
    page : nextPage++

  }).done(showImages).done(function(info){

    if(info.photos.page === info.photos.pages){
      stage.lastPageReached = true;
    }

    console.log(info);
  });
};
const showImages = function (results){

  console.log(results);
  _(results.photos.photo).each(function(photo){

    //generate url from the photo object
    const thumbNailURL = generateURL(photo);

    const $img = $('<img>', {src: thumbNailURL, alt: photo.title});
    $img.appendTo('#images');

    // display the image at the url

  });
};

const generateURL = function(p){
  return [
  'http://farm',
  p.farm,
  '.static.flickr.com/',
  p.server,
  '/',
  p.id,
  '_',
  p.secret,
  '_t.jpg'//Change 'q' to something else for different sizes (see docs)
].join('');
}
$(document).ready(function(){

  let searchTerms = "";

  $('#search').on('submit', function(event){
    event.preventDefault();//Disable form being submitted to the server.
    $('#images').empty();
    state.nextPage = 1;
    state.lastPageReached = false;
    //get the search terms
    searchTerms = $('#query').val();
    searchFlickr(searchTerms);
    //SearchFlickr();
  });

  const chillSearchFlicker = _.debounce(searchFlickr, 4000, true);
  $(window).on('scroll',function(){

    //calculate the scroll bottom
    const scrollBottom = $(document).height()- $(window).scrollTop()- $(window).height();

    if(stage.scrollBottom < 400){
      chillSearchFlicker(searchTerms);
    }
    //if scroll bottom < 200px
    //searchFlickr again
  });
});
