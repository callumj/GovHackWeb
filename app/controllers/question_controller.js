// Filename: models/project
define([
  'jquery',
  'underscore',
  'models/questionnaire',
  'views/question_view',
  'controllers/request_controller',
  'controllers/map_controller',
  'controllers/question_history_controller'
], function($, _, Questionnaire, QuestionView, RequestController, MapController, QuestionHistoryController) {
  var QuestionController = (function () {

    var firstBoot = function() {
      if (QuestionController.booted)
        return;

      QuestionController.booted = true;

      attachEvents();
      QuestionController.activeQuestionnaire = new Questionnaire();
      MapController.initMap();
      QuestionHistoryController.handleHistoryChange = QuestionController.historyUpdated;
    }

    var nextQuestion = function() {
      startViews();
      QuestionController.activeQuestion = QuestionController.activeQuestionnaire.nextQuestion();
      QuestionController.activeView.model = QuestionController.activeQuestion;
      if (QuestionController.activeView.model)
        QuestionController.activeView.render();
      else
        QuestionController.activeView.el.hide();

      if (QuestionController.activeQuestionnaire.reachedMinimumSufficientData())
        showActionButton();
    }

    var startViews = function() {
      if (QuestionController.activeView)
        return;

      QuestionController.activeView = new QuestionView();
      QuestionController.activeView.el = $("#question-content");
      QuestionController.activeView.eventHandler = remoteEventHandler;
    }

    var showActionButton = function() {
      $("html").addClass("action-button-visible");
      $("#question-controller").removeClass("hidden");
    }

    var updateActionButtonProgress = function() {
      $("#question-controller .action-button").attr("style", "background-size:" + QuestionController.activeQuestionnaire.percentageComplete() + "% 100%");
    }

    var showMapData = function() {
      MapController.drawData();
      QuestionHistoryController.reflectHistory(QuestionController.activeQuestionnaire);
      MapController.mapViewable = true;
    }

    var attachEvents = function() {
      $("#question-controller .action-button").on("click", handleActionButton)
    }

    var handleActionButton = function(event) {
      showMapData();
    }

    var remoteEventHandler = function(type, event) {
      if (type == "nextClick")
        nextClickEvent(event);
    }

    var historyUpdated = function(type, changedView) {
      if (type == "nextClick") {
        updateData(changedView)
        showMapData();
      }
    }

    var nextClickEvent = function(changedView) {
      updateData(changedView)
      nextQuestion();

      if (MapController.mapViewable)
        showMapData();
    }

    var updateData = function(changedView) {
      QuestionController.activeQuestionnaire.respondToQuestion(changedView.model.key, changedView.received_value);
      RequestController.sendResponse(QuestionController.activeQuestionnaire, QuestionController.dataReturnedEvent);
      updateActionButtonProgress();
    }

    var dataReturnedEvent = function(data) {
      MapController.setData(data);
    }

    return {
      firstBoot:          firstBoot,
      nextQuestion:       nextQuestion,
      startViews:         startViews,
      dataReturnedEvent:  dataReturnedEvent,
      remoteEventHandler: remoteEventHandler,
      historyUpdated:     historyUpdated,
      handleActionButton: handleActionButton,
      mapViewable:        false,
    }

  })();

  $(function() {
    QuestionController.firstBoot();
    window.setTimeout(function() {
      QuestionController.nextQuestion();
    }, 200);
  });

  window.QuestionController = QuestionController;
  return QuestionController
});