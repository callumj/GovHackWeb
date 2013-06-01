// Filename: models/project
define([
  'jquery',
  'underscore',
  'models/questionnaire',
  'views/question_view',
  'controllers/request_controller',
  'controllers/map_controller'
], function($, _, Questionnaire, QuestionView, RequestController, MapController) {
  var QuestionController = (function () {

    var firstBoot = function() {
      if (QuestionController.booted)
        return;

      QuestionController.activeQuestionnaire = new Questionnaire();
      MapController.initMap();
    }

    var nextQuestion = function() {
      startViews();
      QuestionController.activeQuestion = QuestionController.activeQuestionnaire.nextQuestion();
      QuestionController.activeView.model = QuestionController.activeQuestion;
      if (QuestionController.activeView.model)
        QuestionController.activeView.render();
      else
        QuestionController.activeView.el.hide();
    }

    var startViews = function() {
      if (QuestionController.activeView)
        return;

      QuestionController.activeView = new QuestionView();
      QuestionController.activeView.el = $("#question-content");
      QuestionController.activeView.eventHandler = eventHandler;
    }

    var eventHandler = function(type, event) {
      if (type == "nextClick")
        nextClickEvent(event);
    }

    var nextClickEvent = function(event) {
      var container = $(event.currentTarget).parents("#question-content");
      var value     = $(container).find("[name=response]").val();
      var key       = $(container).find("[name=key]").val();
      QuestionController.activeQuestionnaire.respondToQuestion(key, value);
      RequestController.sendResponse(QuestionController.activeQuestionnaire, QuestionController.dataReturnedEvent);
      nextQuestion();
    }

    var dataReturnedEvent = function(data) {
      MapController.drawData(data);
    }

    return {
      firstBoot:         firstBoot,
      nextQuestion:      nextQuestion,
      startViews:        startViews,
      dataReturnedEvent: dataReturnedEvent
    }

  })();

  $(function() {
    QuestionController.firstBoot();
    window.setTimeout(function() {
      QuestionController.nextQuestion();
    }, 10);
  });

  window.QuestionController = QuestionController;
  return QuestionController
});