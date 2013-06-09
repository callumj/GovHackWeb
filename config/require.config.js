var requirejs_config = ({
    name: "main",
    deps: ["main"],
    baseUrl: "app/",
    out: "build/application.js",
    paths: {
        backbone:                            "../vendor/backbone/backbone",
        "backbone.layoutmanager": "../vendor/backbone.layoutmanager/backbone.layoutmanager",
        jquery:                                 "../vendor/jquery/jquery",
        lodash:                                "../vendor/lodash/lodash",
        underscore:                         "../vendor/underscore/underscore",
        handlebars:                         "../vendor/handlebars/handlebars",
        infobox:                              "../vendor/infobox/infobox",
        wicket:                                "../vendor/wicket/wicket",
        app_template:                     "templates"
    },
    shim: {
        "app_template": {
            "deps": [
                "jquery",
                "handlebars"
            ],
            "exports": "Templates"
        },
        "backbone": {
            "deps": [
                "jquery",
                "lodash"
            ],
            "exports": "Backbone"
        },
        "backbone.layoutmanager": {
            "deps": [
                "jquery",
                "backbone",
                "lodash"
            ],
            "exports": "Backbone.LayoutManager"
        },
        "handlebars": {
            "deps": [
                "jquery"
            ],
            "exports": "Handlebars"
        },
        "underscore": {
            "exports": "_"
        },
        "infobox": {
            "exports": "Infobox"
        },
        "wicket": {
            "exports": "Wkt"
        }
    }
});

if (typeof(requirejs) == "function" && typeof(requirejs.config) == "function") {
    requirejs.config(requirejs_config);
} else {
    module.exports = requirejs_config;
}