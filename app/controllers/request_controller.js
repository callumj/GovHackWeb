// Filename: models/project
define([
  'jquery',
  'underscore'
], function($, _) {
  var RequestController = (function () {

    var recommendationsFromServer = function(model, callback) {
      $.ajax({
        dataType: "json",
        url: "http://placeme.azurewebsites.net/suburb/recommendation",
        data: {responses: model.responseForSerialization()},
        success: callback
      });
    }

    var sendResponse = function(model, callback) {
      recommendationsFromServer(model, callback);
      //fakeSendResponse(model, callback);
    }

    var fakeSendResponse = function(model, callback) {
      var responses = model.attributes["answered"];
      if (responses.near_work && responses.entertain && responses.yolo) {
        var fake_data = [
          {
            suburb_name:        "City Beach",
            percent:            93,
            post_code:          6015,
            suburb_info:        "An info",
            avg_cost_purchase:  500000,
            avg_cost_rent:      500,
            cbd_distance:       10.1,
            airport_distance:   9.2,
            costline_distance:  4.3
          },
          {
            suburb_name: "Claremont",
            percent:     99,
            post_code:   6010,
            suburb_info: "An info",
            avg_cost_purchase:  500000,
            avg_cost_rent:      500,
            cbd_distance:       10.1,
            airport_distance:   9.2,
            costline_distance:  4.3
          },
          {
            suburb_name: "Subiaco",
            percent: 80,
            post_code:   6000,
            suburb_info: "An info",
            avg_cost_purchase:  500000,
            avg_cost_rent:      500,
            cbd_distance:       10.1,
            airport_distance:   9.2,
            costline_distance:  4.3
          }
        ]

        callback(fake_data);
      } else {
        callback([]);
      }
    }

    return {
      sendResponse: sendResponse
    }

  })();

  return RequestController
});