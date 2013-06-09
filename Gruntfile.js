module.exports = function(grunt) {

  var opt = require('./config/require.config.js');

  console.log(opt);

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
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-watch');

};