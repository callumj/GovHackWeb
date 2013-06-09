## GovHackWeb

This heavily prototyped Backbone application provides a simple interface to a powerful .Net application for querying Western Australian suburb viability.

## Requirements

This projects make use of the Grunt build system, which is distributed by npm. The recommended procedure for intalling Grunt is:

```bash
npm uninstall -g grunt
npm install -g grunt-cli
```

See more at http://gruntjs.com/getting-started

Once you have installed Grunt you will need to meet the depedencies described in package.json. This is achieved by npm

```bash
npm install
```

You should have `grunt` available for usage. If you do not, the npm/bins may not be in your PATH, you can run `grunt` directly via `/usr/local/share/npm/bin/grunt`

## Running

For development the application can be run directly from `/index.html`

When developing locally you will need to have `grunt watch` running, as this will trigger the following updates needed for local development

* Compiling templates/*.html into `app/templates.js`

## Building

The application is built for distribution into `build/`, you can take this whole folder and copy it to a host such as S3.

The custom task `dist` performs the following tasks

* Invokes the `requirejs` task to compile `app/main.js` and dependencies (+ vendor files)
* Invokes `cssmin` which compresses `app/styles/index.css` (+ @imports) into `build/assets/application.css`
* Invokes `index` task
  * Invokes `uglify` which compresses the require.js file from `node_modules` into `build/javascripts/require.js`
  * Invokes `copy` which copies `app/fonts` and `app/images` into `build/assets`
  * Invokes `dom_munger` which goes through index.html and removes development JS & CSS references to point them to the new `build/`
* Invokes `regex-replace` which replaces references in `application.css` for `../images`/ and `../fonts/` to `assets/fonts` OR `assets/images`

Once this is completed you can use the `build/` folder for distribution.