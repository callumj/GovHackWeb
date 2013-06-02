// Filename: models/project
define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {
  var Map = (function () {



    var MapStyleLabels = [

      { elementType: "labels", stylers : [{ visibility: "on" }] },
      { featureType: "road", elementType: "labels", stylers: [{ visibility: "off" }]},
      { featureType: "transit", elementType: "labels", stylers: [{ visibility: "off" }]},
      // { featureType: "water",stylers : [{ color: "#7EACF2" }] },
      // { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#ABCF06" }]},
      { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }]}
      // { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#FF8C10" }] },
      // { featureType: "road.arterial", elementType: "labels.text.stroke",stylers: [{ color: "#ffffff" }]},
      // { featureType: "road.arterial", elementType: "geometry.fill",stylers: [{ color: "#FF6C5E" }]},
      // { featureType: "road.arterial", elementType: "labels.text.fill", stylers: [{ color: "#000000" } ]},
      // { featureType: "road.highway", elementType: "labels.text.fill", stylers: [ { color: "#000000" }]},
      // { featureType: "road.highway", elementType: "labels.text.stroke", stylers: [{ color: "#ffffff" } ]}
    ];

    var MapStyleNoLabels = [
      { elementType: "labels", stylers : [{ visibility: "off" }] }
      // { featureType: "water",stylers : [{ color: "#7EACF2" }] },
      // { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#ABCF06" }]},
      // { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#FF8C10" }] },
      // { featureType: "road.arterial", elementType: "labels.text.stroke",stylers: [{ color: "#ffffff" }]},
      // { featureType: "road.arterial", elementType: "geometry.fill",stylers: [{ color: "#FF6C5E" }]},
      // { featureType: "road.arterial", elementType: "labels.text.fill", stylers: [{ color: "#000000" } ]},
      // { featureType: "road.highway", elementType: "labels.text.fill", stylers: [ { color: "#000000" }]},
      // { featureType: "road.highway", elementType: "labels.text.stroke", stylers: [{ color: "#ffffff" } ]}
    ];

    var loadedMap = function() {
      google.maps.visualRefresh = true;

      if (Map.activeMap)
        return Map.activeMap;

      var mapOptions = {
        zoom: 10,
        center: new google.maps.LatLng(-31.9530044, 115.8585),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        overviewMapControl: false,
        panControl: false,
        rotateControl: false,
        scaleControl: false,
        zoomControl: false,
        draggable: false,
        scrollwheel: false,
        styles: MapStyleNoLabels

      };

      google.maps.visualRefresh = true;

      var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

      google.maps.event.addListener(map, 'zoom_changed', function() {
        var cur_zoom = map.getZoom();
        if (cur_zoom > 14)
          map.setZoom(14);
      });

      Map.activeMap = map;
    }



    return {
      loadedMap: loadedMap,
      MapStyleLabels: MapStyleLabels

    }

  })();

  return Map
});
