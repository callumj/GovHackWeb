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
    {q: "Do you want to live near the city?", key: "closeToCity", type: "boolean"},
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
        {key: "46-55",    s: "46 - 55"},
        {key: "55-80",    s: "56+"}
      ]
    },
    {
      q: "What is your median house price?",
      key: "housePrice",
      type: "multi-drop",
      values: [
        {key: "200000-500000",  s: "200 000 - 500 000"},
        {key: "500000-1000000", s: "500 000 - 1 000 000"},
        {key: "1000000-1500000", s: "1 000 000 - 1 500 000"},
        {key: "1500000-2500000", s: "1 000 000 - 2 500 000"},
      ]
    },
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
    },

    responseForSerialization: function() {
      var response = {}
      var context = this;
      _.each(this.attributes["answeredKeys"], function(key) {
        var value = context.attributes["answered"][key];
        if (typeof(value) == "string" && value.indexOf("-") != -1)
          value = value.split("-");
        response[key] = value;
      });

      response["state"] = "WA";

      return response;
    }

  });

  window.QUESTIONNAIRES = QUESTIONNAIRES;
  return Questionnaire
});
