// Filename: models/project
define([
  'underscore',
  'models/map',
  'models/suburb'
], function(_, Map, Suburb) {
  var MapController = (function () {

    var initMap = function() {
      Map.loadedMap();
    }

    var drawData = function(data_set) {
      MapController.drawnMarkers = 0;
      _.each(MapController.activeSuburbs, function(suburb) {
        suburb.removeMarker();
      });
      _.each(data_set, function(data) {
        var suburb = new Suburb(data);
        MapController.activeSuburbs.push(suburb);
        suburb.drawMarker(MapController.markerDrawn);
      });
    }

    var markerDrawn = function(suburb) {
      MapController.drawnMarkers += 1;
      if (MapController.drawnMarkers == MapController.activeSuburbs.length)
        centerMap();
    }

    var centerMap = function() {
      var boundObject = new google.maps.LatLngBounds();
      _.each(MapController.activeSuburbs, function(suburb) {
        boundObject.extend(suburb.attributes["location"]);
      });
      Map.loadedMap().setCenter(boundObject.getCenter());
      Map.loadedMap().fitBounds(boundObject);
      animateMarkers();
    }

    var animateMarkers = function() {
      _.each(MapController.activeSuburbs, function(suburb) {
        suburb.attributes.marker.setAnimation(google.maps.Animation.BOUNCE);
      });

      setTimeout(MapController.dropAnimateMarkers, 3000);
    }

    var dropAnimateMarkers = function() {
      _.each(MapController.activeSuburbs, function(suburb) {
        suburb.attributes.marker.setAnimation(null);
      });
    }

    return {
      drawData:           drawData,
      initMap:            initMap,
      markerDrawn:        markerDrawn,
      centerMap:          centerMap,
      animateMarkers:     animateMarkers,
      dropAnimateMarkers: dropAnimateMarkers,
      activeSuburbs: [],
      drawnMarkers:  0
    }

  })();

  return MapController
});