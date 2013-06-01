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
        suburbName:         this.model.Name,
        postCode:           this.model.PostCodes[0],
        suburbInfo:         "",
        avgCostPurchase:    this.model.Price,
        avgCostRent:        0,
        cbdDistance:        this.model.DistanceToCityText,
        airportDistance:    0,
        coastlineDistance:  0
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