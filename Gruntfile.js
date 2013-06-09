module.exports = function(grunt) {

  var require_options = require('./config/require.config.js');
  require_options.out = "build/javascripts/application.js"

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    handlebars: {
      compile: {
        options: {
          namespace: "Templates"
        },
        files: {
          "app/templates.js": ["templates/*.html"]
        }
      }
    },
    watch: {
      templates: {
        files: ["templates/*.html"],
        tasks: ['handlebars']
      }
    },
    cssmin: {
      compress: {
        files: {
          "build/assets/application.css": ["app/styles/index.css"]
        }
      }
    },
    requirejs: {
      compile: {
        options: require_options
      }
    },
    copy: {
      main: {
        files: [
          {src: "index.html", dest: 'build/index.html'},
          {expand: true, cwd: "app/fonts/", src: ['**'], dest: "build/assets/fonts/"},
          {expand: true, cwd: "app/images/", src: ['**'], dest: "build/assets/images/"}
        ]
      }
    },
    dom_munger: {
      primary_css: {
        options: {
          remove: '.remove_directive',
          update: { selector: "#primary_css", attribute: "href", value: "assets/application.css" }
        },
        src: 'build/index.html',
      },
      require_js: {
        options: {
          update: { selector: "#primary_js", attribute: "src", value: "javascripts/require.js" }
        },
        src: 'build/index.html',
      },
      main_js: {
        options: {
          update: { selector: "#primary_js", attribute: "data-main", value: "javascripts/application.js" }
        },
        src: 'build/index.html',
      }
    },
    uglify: {
      requirejs: {
        files: {
          'build/javascripts/require.js': ['node_modules/grunt-contrib-requirejs/node_modules/requirejs/require.js']
        }
      }
    },
    "regex-replace": {
      css: {
        src: ['build/assets/application.css'],
        actions: [
          {
            name: 'images',
            search: '\.\.\/images',
            replace: 'images'
          },
          {
            name: 'images',
            search: '\.\.\/fonts',
            replace: 'fonts'
          }
        ]
      }
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-html-build');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-dom-munger');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-regex-replace');

  grunt.registerTask('index', ['uglify', 'copy', 'dom_munger'])
  grunt.registerTask('dist', ['handlebars', 'requirejs', 'cssmin', 'index', 'regex-replace']);

};