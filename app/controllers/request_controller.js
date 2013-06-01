// Filename: models/project
define([
  'underscore'
], function(_) {
  var RequestController = (function () {

    var sendResponse = function(model, callback) {
      fakeSendResponse(model, callback);
      // usually JSON would go here
    }

    var fakeSendResponse = function(model, callback) {
      var responses = model.attributes["answered"];
      if (responses.near_work && responses.entertain && responses.yolo) {
        var fake_data = [
          {
            suburb_name: "City Beach",
            percent:     93,
          },
          {
            suburb_name: "Claremont",
            percent:     99
          },
          {
            suburb_name: "Subiaco",
            percent: 80
          }
        ]

        callback(fake_data);
      }
    }

    return {
      sendResponse: sendResponse
    }

  })();

  return RequestController
});