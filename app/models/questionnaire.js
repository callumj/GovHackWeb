// Filename: models/questionnaire
define([
  'jquery',
  'underscore',
  'backbone'
], function($, unds, Backbone) {
  var QUESTIONNAIRES = [
    {q: "Do you want to live near work?", key: "near_work", type: "boolean"},
    {q: "Do you like to entertain?",      key: "entertain", type: "boolean"},
    {q: "Do you YOLO hard?",              key: "yolo",      type: "boolean"}
  ];

  var Questionnaire = Backbone.Model.extend({

    initialize: function() {
      this.set({answered: {}, answeredKeys: []});
    },

    nextQuestion: function() {
      var context    = this;
      var return_val = null;
      _.each(QUESTIONNAIRES, function(question) {
        var ans_key = question.key;
        var seen = (_.indexOf(context.attributes["answeredKeys"], ans_key) != -1);
        if (!seen) {
          return_val = question;
        }
      });
      return return_val;
    },

    respondToQuestion: function(key, value) {
      this.attributes["answeredKeys"].push(key);
      this.attributes["answered"][key] = value;
    }

  });

  return Questionnaire
});