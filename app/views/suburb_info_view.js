// Filename: models/questionnaire
define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars'
], function($, unds, Backbone, Handlebars) {
  var SuburbInfoView = Backbone.View.extend({
    template: "suburb_info_view",

    serialize: function() {
      var response = {
        suburbName:         this.model.suburb_name,
        postCode:           this.model.post_code,
        suburbInfo:         this.model.suburb_info,
        avgCostPurchase:    this.model.avg_cost_purchase,
        avgCostRent:        this.model.avg_cost_rent,
        cbdDistance:        this.model.cbd_distance,
        airportDistance:    this.model.airport_distance,
        coastlineDistance:  this.model.costline_distance
      };

      return response;
    },

    sendEvent: function(type, event) {
      if (this.eventHandler)
        this.eventHandler(type, event);
    }
  });

  return SuburbInfoView;
});