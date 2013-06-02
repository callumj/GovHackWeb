// Filename: models/project
define([
  'jquery',
  'underscore',
  'views/suburb_info_view'
], function($, _, SuburbInfoView) {
  var SuburbInfoController = (function () {

    var loadView = function() {
      if (SuburbInfoController.activeView)
        return SuburbInfoController.activeView;

      SuburbInfoController.activeView = new SuburbInfoView();
      SuburbInfoController.activeView.el = $("#suburb-info");
    }

    var showSuburbInfo = function(suburb) {
      loadView();
      bindEvents();

      SuburbInfoController.activeView.model = suburb;
      SuburbInfoController.activeView.el.show();
      SuburbInfoController.activeView.render();
    }

    var hideSuburbInfo = function() {
      SuburbInfoController.activeView.el.hide();
    }

    var handleCloseResults = function(event) {
      event.preventDefault();
      SuburbInfoController.hideSuburbInfo();
    }

    var bindEvents = function() {
      if (SuburbInfoController.binded)
        return;

      $("#suburb-info").on("click", ".close-results", SuburbInfoController.handleCloseResults)
      SuburbInfoController.binded = true;
    }

    return {
      loadView:           loadView,
      showSuburbInfo:     showSuburbInfo,
      hideSuburbInfo:     hideSuburbInfo,
      handleCloseResults: handleCloseResults,
      binded:             false,
      activeView:         null
    }

  })();

  window.SuburbInfoController = SuburbInfoController;
  return SuburbInfoController
});