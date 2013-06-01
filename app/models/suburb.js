// Filename: models/questionnaire
define([
  'jquery',
  'underscore',
  'backbone',
  'models/map'
], function($, unds, Backbone, Map) {
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

    drawMarker: function() {
      var marker = new google.maps.Marker({
        position: this.attributes.location,
        map: Map.loadedMap(),
        title: this.attributes.suburb_name,
        animation: google.maps.Animation.DROP
      });

      this.attributes["marker"] = marker;
    }

  });

  return Suburb
});