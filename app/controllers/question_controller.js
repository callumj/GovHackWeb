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
      $("#question-controller").removeClass("hidden");
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

    var historyUpdated = function(type, event) {
      if (type == "nextClick") {
        QuestionController.activeQuestionnaire.respondToQuestion(changedView.model.key, changedView.received_value);
        RequestController.sendResponse(QuestionController.activeQuestionnaire, QuestionController.dataReturnedEvent);
        showMapData();
      }
    }

    var nextClickEvent = function(changedView) {
      QuestionController.activeQuestionnaire.respondToQuestion(changedView.model.key, changedView.received_value);
      RequestController.sendResponse(QuestionController.activeQuestionnaire, QuestionController.dataReturnedEvent);
      nextQuestion();

      if (MapController.mapViewable)
        showMapData();
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