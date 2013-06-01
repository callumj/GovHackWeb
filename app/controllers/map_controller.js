// Filename: models/project
define([
  'jquery',
  'underscore',
  'models/map',
  'models/suburb',
  'controllers/suburb_info_controller'
], function($, _, Map, Suburb, SuburbInfoController) {
  var MapController = (function () {

    var initMap = function() {
      Map.loadedMap();
    }

    var setData = function(data_set) {
      MapController.dataSet = data_set;
    }

    var drawData = function() {
      MapController.drawnMarkers = 0;
      _.each(MapController.activeSuburbs, function(suburb) {
        suburb.removeMarker();
      });

      fetchLocationData()
    }

    var fetchLocationData = function() {
      _.each(MapController.dataSet, function(data) {
        var suburb = new Suburb(data);
        MapController.activeSuburbs.push(suburb);
        suburb.markerClickEvent = MapController.markerClickedEvent
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
        animateMapIn();
        setTimeout(resizeMap, 1000)
        setTimeout(centerMap, 1000);
        setTimeout(drawMarkers, 2300);
      }
    }

    var drawMarkers = function() {
      google.maps.event.trigger(Map.loadedMap(), 'resize');
      _.each(MapController.activeSuburbs, function(suburb) {
        suburb.drawMarker();
      });
    }

    var centerMap = function() {
      var boundObject = new google.maps.LatLngBounds();
      _.each(MapController.activeSuburbs, function(suburb) {
        boundObject.extend(suburb.attributes["location"]);
      });
      Map.loadedMap().setCenter(boundObject.getCenter());
      Map.loadedMap().fitBounds(boundObject);
    }

    var resizeMap = function() {
      google.maps.event.trigger(Map.loadedMap(), 'resize');
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

    var markerClickedEvent = function(model, event) {
      if (MapController.activeSuburb == null || MapController.activeSuburb != model) {
        SuburbInfoController.showSuburbInfo(model);
      } else if (MapController.activeSuburb == model) {
        SuburbInfoController.hideSuburbInfo();
        MapController.activeSuburb = null;
      }
    }

    return {
      setData:            setData,
      drawData:           drawData,
      initMap:            initMap,
      locationReady:      locationReady,
      drawMarkers:        drawMarkers,
      centerMap:          centerMap,
      animateMarkers:     animateMarkers,
      dropAnimateMarkers: dropAnimateMarkers,
      markerClickedEvent: markerClickedEvent,
      activeSuburb:       false,
      mapInView:          false,
      activeSuburbs:      [],
      drawnMarkers:       0,
      locationsLoaded:    0,
      dataSet:            []
    }

  })();

  return MapController
});