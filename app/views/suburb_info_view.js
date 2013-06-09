// Filename: models/questionnaire
define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'app_template'
], function($, unds, Backbone, Handlebars, Templates) {
  var SuburbInfoView = Backbone.View.extend({

    render: function() {
      this.el.html(Templates["templates/suburb_info_view.html"](this.serialize()));
    },

    serialize: function() {
      var response = {
        suburbName:              this.model.displayName(),
        postCode:                this.model.postCode(),
        nbnLastWorkCommenceYear: this.model.nbnLastWorkCommence(),
        suburbInfo:              this.model.truncatedDescription(),
        avgCostPurchase:         this.model.attributes.Suburb.Price,
        avgRentPrice:            this.model.attributes.Suburb.AverageWeeklyRent,
        avgSalary:               this.model.attributes.Suburb.AverageHouseholdSalary,
        avgAge:                  this.model.attributes.Suburb.AverageAge,
        cbdDistance:             this.model.attributes.Suburb.DistanceToCityText,
        cbdTiming:               this.model.attributes.Suburb.TimeToCityText,
        growthPercentage:        this.model.attributes.Suburb.GrowthPercentage,
        population:              this.model.attributes.Suburb.Population,
        sizeSquared:             this.model.attributes.Suburb.SizeKmSquared,
        percentFemale:           this.model.attributes.Suburb.PercentFemales,
        percentMale:             this.model.attributes.Suburb.PercentMales,
        numNightLife:            this.model.attributes.Suburb.NumNightlife,
        numArtsLife:             this.model.attributes.Suburb.NumArtsAndRecreation,
        streetViewImage:         $.trim(this.model.largeStreetViewImage())
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