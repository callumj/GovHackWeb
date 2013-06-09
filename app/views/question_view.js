// Filename: models/questionnaire
define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'app_template'
], function($, unds, Backbone, Handlebars, Templates) {
  var QuestionView = Backbone.View.extend({

    render: function() {
      this.el.html(Templates["templates/question_view.html"](this.serialize()));
    },

    isBool: function() {
      return this.model.type == "boolean";
    },

    isString: function() {
      return this.model.type == "string";
    },

    isMulti: function() {
      return this.model.type == "multi"
    },

    isMultiDrop: function() {
      return this.model.type == "multi-drop"
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
        isMultiDrop: this.isMultiDrop(),
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
      $(this.el).find(".drop").change(function(event) {
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
      } else if (this.isMultiDrop()) {
        value = $(container).find("[name=value]").val();
      } else {
        value = $(container).find("[name=response]").val();
      }

      this.received_value = value;

      context.sendEvent("nextClick", this);
    },

    sendEvent: function(type, event) {
      if (this.eventHandler)
        this.eventHandler(type, event);
    }
  });

  window.QuestionView = QuestionView;
  return QuestionView;
});