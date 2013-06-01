// Filename: models/questionnaire
define([
  'jquery',
  'underscore',
  'backbone',
  'models/map',
  'infobox'
], function($, unds, Backbone, Map, Infobox) {
  var Suburb = Backbone.Model.extend({

    initialize: function() {
      this.set({});
    },

    removeMarker: function() {
      if (this.attributes.marker)
        this.attributes.marker.setMap(null);
    },

    address: function() {
      return this.attributes.suburb_name + ", WA";
    },

    streetViewImage: function() {
      var lat_lng = this.attributes.location.lat() + "," + this.attributes.location.lng();
      return "http://maps.googleapis.com/maps/api/streetview?size=400x100&location=" + lat_lng +"&pitch=1&sensor=false"
    },

    populateLocation: function(location_callback) {
      var geocoder = new google.maps.Geocoder();
      var context = this;
      geocoder.geocode({'address': this.address()}, function(results, status) {
        var first = results[0];
        if (!first)
          return;

        context.attributes["location"] = first.geometry.location;

        if (location_callback)
          location_callback(context);
      });
    },

    buildInfoWindow: function() {
      if (this.attributes["info_window"])
        return this.attributes["info_window"];

      var boxText = document.createElement("div");
      boxText.style.cssText = "background: white";
      var content_string = "<div class=\"info_box\">";
      content_string += "<div class=\"title\"><h2>" + this.attributes.suburb_name + "</h2></div>";
      content_string += "<div class=\"percent\">" + this.attributes.percent + "%</div>";
      content_string += "<div class=\"street-view\"><img src=\"" + this.streetViewImage() + "\" width=\"400\" height=\"100\" /></div>";
      content_string += "</div>"
      boxText.innerHTML = content_string;

      var info_window = new InfoBox({
        content:        boxText,
        closeBoxURL:    "http://www.google.com/intl/en_us/mapfiles/close.gif",
        closeBoxMargin: "10px 2px 2px 2px",
        boxStyle: {
          width: "400px",
          height: "400px"
        }
      });

      this.attributes["info_window"] = info_window;
      return this.attributes["info_window"];
    },

    drawMarker: function() {
      var marker = new google.maps.Marker({
        position: this.attributes.location,
        map: Map.loadedMap(),
        title: this.attributes.suburb_name,
        animation: google.maps.Animation.DROP
      });

      this.attributes["marker"] = marker;

      var context = this;
      google.maps.event.addListener(marker, 'mouseover', function() {
        context.buildInfoWindow().open(Map.loadedMap(), marker);
      });
      google.maps.event.addListener(marker, 'mouseout', function() {
        context.buildInfoWindow().close(Map.loadedMap(), marker);
      });
    }

  });

  return Suburb
});