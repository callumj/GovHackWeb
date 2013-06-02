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

    var dropData = function() {
      _.each(MapController.activeSuburbs, function(suburb) {
        suburb.removeFromMap();
      });
    }

    var drawData = function() {
      dropData();

     _.each(MapController.dataSet, function(data) {
        var suburb = new Suburb(data);
        MapController.activeSuburbs.push(suburb);
        suburb.markerClickEvent = MapController.markerClickedEvent
      });

      locationReady();
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

    var animateMapOut = function() {
      dropData();
      var map_div = $( Map.loadedMap().getDiv());
      map_div.removeClass("foreground");
      map_div.parents("#map-container").removeClass("foreground");
      $("html").removeClass("map-active");
      MapController.mapInView = false;
    }

    var locationReady = function(suburb) {
      MapController.locationsLoaded += 1;
      animateMapIn();
      setTimeout(resizeMap, 1000)
      setTimeout(centerMap, 1000);
      setTimeout(drawPolygons, 2300);
      google.maps.event.trigger(Map.loadedMap().setOptions({styles: Map.MapStyleLabels, draggable: true, scrollwheel: false}));
    }

    var drawPolygons = function() {
      google.maps.event.trigger(Map.loadedMap(), 'resize');
      _.each(MapController.activeSuburbs, function(suburb) {
        suburb.drawPolygons();
      });
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
        boundObject.extend(suburb.centerLocation());
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
      animateMapOut:      animateMapOut,
      activeSuburb:       false,
      mapInView:          false,
      activeSuburbs:      [],
      locationsLoaded:    0,
      dataSet:            []
    }

  })();

  return MapController
});