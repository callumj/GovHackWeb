// Filename: models/questionnaire
define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars'
], function($, unds, Backbone, Handlebars) {
  var QuestionView = Backbone.View.extend({
    template: "question_view",

    isBool: function() {
      return this.model.type == "boolean";
    },

    isString: function() {
      return this.model.type == "string";
    },

    isMulti: function() {
      return this.model.type == "multi"
    },

    multiValues: function() {
      if (this.model.values)
        return this.model.values;
      else
        return [];
    },

    serialize: function() {
      var response = {
        key:         this.model.key,
        isBool:      this.isBool(),
        isString:    this.isString(),
        text:        this.model.q,
        val:         this.set_value,
        isMulti:     this.isMulti(),
        multiValues: this.multiValues()
      };

      return response;
    },

    beforeRender: function() {
      if (this.el)
        $(this.el).unbind();
    },

    afterRender: function() {
      // attach events
      var context = this;
      $(this.el).on("click", ".next", function(event) {
        context.handleNextClick(context, event);
      });
    },

    handleNextClick: function(context, event) {
      var sender    = $(event.currentTarget);
      var container = $(event.currentTarget).parents("#question-content");
      var key       = $(container).find("[name=key]").val();
      var value     = null;
      if (this.isBool()) {
        value = sender.hasClass("true");
      } else if (this.isMulti()) {
        _.each(this.multiValues(), function(item) {
          if (sender.data("val") == item.key)
            value = item.key;
        })
      } else {
        value = $(container).find("[name=response]").val();
      }

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