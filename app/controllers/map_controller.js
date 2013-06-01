// Filename: models/project
define([
  'jquery',
  'underscore',
  'models/map',
  'models/suburb'
], function($, _, Map, Suburb) {
  var MapController = (function () {

    var initMap = function() {
      Map.loadedMap();
    }

    var drawData = function(data_set) {
      MapController.drawnMarkers = 0;
      _.each(MapController.activeSuburbs, function(suburb) {
        suburb.removeMarker();
      });

      fetchLocationData(data_set);
    }

    var fetchLocationData = function(data_set) {
      _.each(data_set, function(data) {
        var suburb = new Suburb(data);
        MapController.activeSuburbs.push(suburb);
        suburb.populateLocation(MapController.locationReady);
      });
    }

    var animateMapIn = function() {
      if (MapController.mapInView)
        return;

      var map_div = $( Map.loadedMap().getDiv());
      map_div.addClass("foreground");
      map_div.parents("#map-container").addClass("foreground");
      $("html").addClass("map-active");
      MapController.mapInView = true;
    }

    var locationReady = function(suburb) {
      MapController.locationsLoaded += 1;
      if (MapController.locationsLoaded == MapController.activeSuburbs.length) {
        centerMap();
        animateMapIn();
        setTimeout(drawMarkers, 1300);
      }
    }

    var drawMarkers = function() {
      google.maps.event.trigger(Map.loadedMap(), 'resize');
      _.each(MapController.activeSuburbs, function(suburb) {
        suburb.drawMarker();
      })
    }

    var centerMap = function() {
      var boundObject = new google.maps.LatLngBounds();
      _.each(MapController.activeSuburbs, function(suburb) {
        boundObject.extend(suburb.attributes["location"]);
      });
      Map.loadedMap().setCenter(boundObject.getCenter());
      Map.loadedMap().fitBounds(boundObject);
    }

    var animateMarkers = function() {
      _.each(MapController.activeSuburbs, function(suburb) {
        suburb.attributes.marker.setAnimation(google.maps.Animation.DROP);
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
      locationReady:      locationReady,
      drawMarkers:        drawMarkers,
      centerMap:          centerMap,
      animateMarkers:     animateMarkers,
      dropAnimateMarkers: dropAnimateMarkers,
      mapInView:          false,
      activeSuburbs:      [],
      drawnMarkers:       0,
      locationsLoaded:    0
    }

  })();

  return MapController
});