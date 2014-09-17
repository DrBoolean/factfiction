/*jslint nomen: true */
requirejs.config({
  shim: {},
  paths: {
    domReady: 'https://cdnjs.cloudflare.com/ajax/libs/require-domReady/2.0.1/domReady.min',
    jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min',
    lodash: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash'
  }
});

require([
    'jquery',
    'lodash',
    'domReady!'
  ],
  function ($, _) {

    ////////////////////////////////////////////
    // Flickr api

    function FlickrSearch(term) { this.term = term; };

    FlickrSearch.prototype = {
      url: function() {
        return 'http://api.flickr.com/services/feeds/photos_public.gne?tags=' + this.term + '&format=json&jsoncallback=?';
      },
      search: function() { return $.getJSON(this.url()); }
    }

    function FlickrResult(json) {
      this.items = json.items.map(function(x) { return new FlickrItem(x); });
    };

    FlickrResult.prototype = {
      images: function() {
        return this.items.map(function(i) { return i.src(); });
      }
    }

    function FlickrItem(j) { this.json = j; };

    FlickrItem.prototype = {
      src: function() { return this.json.media.m; }
    }


    var widget = function(term) {
      var flickr_search = new FlickrSearch(term);

      return flickr_search.search().then(function(res) {
        var flickr_result = new FlickrResult(res);
        return flickr_result.images().map(function(src) {
          return $('<img/>', {src: src});
        });
      });
    };


    /////////////////////////////////////////////////////////////////////////////////////
    // Impure code

    widget('cat').then(function(image_tags) {
      $('#flickr').html(image_tags);
    });
  });


