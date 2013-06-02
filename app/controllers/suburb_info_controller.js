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

      SuburbInfoController.activeView.model = suburb;
      SuburbInfoController.activeView.el.show();
      SuburbInfoController.activeView.render();
    }

    var hideSuburbInfo = function() {
      SuburbInfoController.activeView.el.hide();
    }

    return {
      loadView:       loadView,
      showSuburbInfo: showSuburbInfo,
      hideSuburbInfo: hideSuburbInfo,
      activeView:     null
    }

  })();

  window.SuburbInfoController = SuburbInfoController;
  return SuburbInfoController
});