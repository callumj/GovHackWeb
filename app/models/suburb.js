// Filename: models/questionnaire
define([
  'jquery',
  'underscore',
  'backbone',
  'models/map',
  'infobox',
  'wicket'
], function($, _, Backbone, Map, Infobox, Wicket) {
  var Suburb = Backbone.Model.extend({

    initialize: function() {
      this.set({});
    },

    removeFromMap: function() {
      if (this.attributes.marker)
        this.attributes.marker.setMap(null);
      if (this.attributes.polygon)
        this.attributes.polygon.setMap(null);
    },

    postCode: function() {
      var code = "";
      if (this.attributes.Suburb.Postcodes) {
        var first_code = this.attributes.Suburb.Postcodes[0];
        if (first_code)
          code = first_code.Id
      }
      return code;
    },

    displayName: function() {
      return this.attributes.Suburb.Name.toLowerCase().replace(/(?:^|\s)\w/g, function(match) {
          return match.toUpperCase();
      });
    },

    address: function() {
      return this.attributes.Suburb.Name + ", " + this.attributes.Suburb.State;
    },

    centerLocation: function() {
      var boundObject = new google.maps.LatLngBounds();
      _.each(this.polygonArray(), function(coord) {
        boundObject.extend(coord);
      });
      return boundObject.getCenter();
    },

    streetViewImage: function() {
      var lat_lng = this.centerLocation().lat() + "," + this.centerLocation().lng();
      return "http://maps.googleapis.com/maps/api/streetview?size=400x100&location=" + this.address() +"&pitch=1&sensor=false"
    },

    percentage: function() {
      return (100 - this.attributes.RankCoefficient);
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

    polygonArray: function() {
      var arry = [];
      var wkt    = new Wicket.Wkt();
      var parsed = wkt.read(this.attributes.Suburb.Geometry.Geometry.WellKnownText);
      _.each(parsed[0], function(coord) {
        arry.push(new google.maps.LatLng(coord.y, coord.x));
      });
      return arry;
    },

    buildInfoWindow: function() {
      if (this.attributes["info_window"])
        return this.attributes["info_window"];

      var boxText = document.createElement("div");
      var content_string = "<div class=\"suburb-info-box\">";
      content_string += "<div class=\"image\"><img src=\"" + this.streetViewImage() + "\" width=\"365\" height=\"65\" /></div>";
      content_string += "<div class=\"copy\">";
      content_string += "<h1>" + this.displayName() + "<span>" + this.percentage() + "<small>%</small><span></h1>";
      content_string += "<h3>" + this.postCode() + "<span>" + this.attributes.Suburb.DistanceToCityText + " to the CBD.</span></h3>";
      content_string += "</div>";
      content_string += "</div>";
      boxText.innerHTML = content_string;

      var info_window = new InfoBox({
        pixelOffset:    new google.maps.Size(-(400 / 2), 0),
        position:       this.centerLocation(),
        content:        boxText,
        closeBoxURL:    "",
        boxStyle: {
          width: "365px",
          height: "150px"
        }
      });

      this.attributes["info_window"] = info_window;
      return this.attributes["info_window"];
    },

    drawPolygons: function() {
      var set = this.polygonArray();
      var polygon = new google.maps.Polygon({
        paths: set,
        strokeColor: '#28b263',
        strokeOpacity: 1.0,
        strokeWeight: 2,
        fillColor: '#31d978',
        fillOpacity: 0.50
      });

      polygon.setMap(Map.loadedMap());

      var marker = new google.maps.Marker({
        position: this.centerLocation(),
        map: Map.loadedMap(),
        visible: false
      });

      this.attributes["polygon"] = polygon;

      var context = this;
      google.maps.event.addListener(polygon, 'mouseover', function() {
        context.buildInfoWindow().open(Map.loadedMap(), marker);
      });
      google.maps.event.addListener(polygon, 'mouseout', function() {
        context.buildInfoWindow().close(Map.loadedMap(), marker);
      });
      google.maps.event.addListener(polygon, 'click', function(event) {
        context.markerClickEvent(context, event);
      });

      google.maps.event.addListener(context.buildInfoWindow(), 'domready', function() {
        $(".suburb-info-box").parent().css("position", "absolute");
        $(".suburb-info-box").parent().css("top", "0px");
        $(".suburb-info-box").on("click", function() {
          context.markerClickEvent(context, event);
        })
      });
    },

    drawMarker: function() {
      var marker = new google.maps.Marker({
        position: this.attributes.location,
        map: Map.loadedMap(),
        title: this.displayName(),
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
      google.maps.event.addListener(marker, 'click', function(event) {
        context.markerClickEvent(context, event);
      });
    }

  });

  return Suburb
});