// Filename: models/questionnaire
define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars'
], function($, unds, Backbone, Handlebars) {
  var SuburbInfo = Backbone.View.extend({
    template: "suburb_info",

    isBool: function() {
      return this.model.type == "boolean";
    },

    isString: function() {
      return this.model.type == "string";
    },

    serialize: function() {
      var response = {
        key:      this.model.key,
        isBool:   this.isBool(),
        isString: this.isString(),
        text:     this.model.q
      };

      return response;
    },

    beforeRender: function() {
      this.el.unbind();
    },

    afterRender: function() {
      // attach events
      var context = this;
      this.el.on("click", ".next", function(event) {
        context.handleNextClick(context, event);
      });
    },

    handleNextClick: function(context, event) {
      context.sendEvent("nextClick", event);
    },

    sendEvent: function(type, event) {
      if (this.eventHandler)
        this.eventHandler(type, event);
    }
  });

  window.QuestionView = QuestionView;
  return QuestionView;
});