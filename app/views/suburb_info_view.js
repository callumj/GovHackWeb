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
        suburbName:         this.displayName(),
        postCode:           this.postCode(),
        suburbInfo:         "",
        avgCostPurchase:    this.model.attributes.Price,
        avgCostRent:        0,
        cbdDistance:        this.model.attributes.DistanceToCityText,
        cbdTiming:          this.model.attributes.TimeToCityText,
        airportDistance:    0,
        coastlineDistance:  0,
        growthPercentage:   this.model.attributes.GrowthPercentage,
        population:         this.model.attributes.Population,
        sizeSquared:        this.model.attributes.SizeKmSquared,
        percentFemale:      this.model.attributes.PercentFemales,
        percentMale:        this.model.attributes.PercentMales
      };

      return response;
    },

    sendEvent: function(type, event) {
      if (this.eventHandler)
        this.eventHandler(type, event);
    },

    postCode: function() {
      var code = "0000";
      if (this.model.attributes.Postcodes) {
        var first_code = this.model.attributes.Postcodes[0];
        if (first_code)
          code = first_code.Id
      }
      return code;
    },

    displayName: function() {
      return this.model.attributes.Name.toLowerCase().replace(/(?:^|\s)\w/g, function(match) {
          return match.toUpperCase();
      });
    }
  });

  return SuburbInfoView;
});