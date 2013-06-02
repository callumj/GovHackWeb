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
        suburbName:         this.model.displayName(),
        postCode:           this.model.postCode(),
        suburbInfo:         this.model.attributes.Suburb.Description,
        avgCostPurchase:    this.model.attributes.Suburb.Price,
        avgCostRent:        0,
        cbdDistance:        this.model.attributes.Suburb.DistanceToCityText,
        cbdTiming:          this.model.attributes.Suburb.TimeToCityText,
        airportDistance:    0,
        coastlineDistance:  0,
        growthPercentage:   this.model.attributes.Suburb.GrowthPercentage,
        population:         this.model.attributes.Suburb.Population,
        sizeSquared:        this.model.attributes.Suburb.SizeKmSquared,
        percentFemale:      this.model.attributes.Suburb.PercentFemales,
        percentMale:        this.model.attributes.Suburb.PercentMales
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