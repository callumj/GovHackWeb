// Filename: models/questionnaire
define([
  'jquery',
  'underscore',
  'backbone'
], function($, unds, Backbone) {
  var QUESTIONNAIRES = [
    {q: "Do you use Public Transport?",                           key: "near_work", type: "boolean"},
    {q: "Is A Local Shopping Centre Important?",                 key: "entertain", type: "boolean"},
    {q: "Do You Ride A Bike? Or Use Cycling Paths?",              key: "yolo",      type: "boolean"},
    {q: "Would You Use A Local Recreation Centre?",               key: "swag",      type: "boolean"},
    {q: "Is Proximity to Sporting Events Important?",               key: "yolo",      type: "boolean"},
    {q: "Is living close to an Open Space Important?",               key: "yolo",      type: "boolean"},
    {q: "Is a Local Daycare Centre Benificial?",               key: "yolo",      type: "boolean"},
    {q: "Would You Use a Library?",                             key: "yolo",      type: "boolean"},
    {q: "Would You Use A Local Gym?",                             key: "yolo",      type: "boolean"},
    {q: "Do You Love a Good Coffee?",                             key: "yolo",      type: "boolean"},
    {q: "Do You Enjoy The Beach?",                             key: "yolo",      type: "boolean"},
    {q: "Do You Have Children?",                             key: "yolo",      type: "boolean"},
    {q: "Do You Own A Pet?",                             key: "yolo",      type: "boolean"},
    {q: "Is fast Medical Assistance Essential?",                             key: "yolo",      type: "boolean"},
    {q: "Is Proximity to Schooling Important?",               key: "yolo",      type: "boolean"},

    {
      q: "What is your age?",
      key: "age",
      type: "multi",
      values: [
        {key: "0-20",  s: ">21"},
        {key: "21-35", s: "21 - 35"},
        {key: "36-45", s: "36 - 45"},
        {key: "46",    s: "46+"}
      ]
    }
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
    },

    reachedMinimumSufficientData: function() {
      return this.attributes.answeredKeys.length >= 3;
    },

    percentageComplete: function() {
      return ((this.attributes.answeredKeys.length / QUESTIONNAIRES.length) * 100.0);
    },

    isExhausted: function() {
      return this.attributes.answeredKeys.length == QUESTIONNAIRES.length;
    }

  });

  window.QUESTIONNAIRES = QUESTIONNAIRES;
  return Questionnaire
});