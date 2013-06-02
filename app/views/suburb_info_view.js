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
        postCode:           this.model.postCode(),
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
    },

    postCode: function() {
      var code = "0000";
      if (this.model.Postcodes) {
        var first_code = this.model.Postcodes[0];
        if (first_code)
          code = first_code
      }
      return code;
    }
  });

  return SuburbInfoView;
});