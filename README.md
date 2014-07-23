# Frontbase :sparkles:

*a starter fuel for web projects* :rocket:


## Engines

<table>
<tr><td><a href="http://handlebarsjs.com">Handlebars</a></td><td>Semantic templates</td></tr>
<tr><td><a href="http://learnboost.github.io/stylus">Stylus</a></td><td>Expressive, dynamic and robust CSS preprocessor</td></tr>
<tr><td><a href="http://browserify.org">Browserify</a></td><td>JavaScript bundling with require() in the browser</td></tr>
<tr><td><a href="http://browsersync.io">BrowserSync</a></td><td>Time-saving synchronised browser testing</td></tr>
<tr><td><a href="http://gruntjs.com">Grunt</a></td><td>Automated build tasks</td></tr>
<tr><td><a href="http://bower.io">Bower</a></td><td>Package manager for the web</td></tr>
</table>


## Initialization

Requirements: [Node.js](http://nodejs.org/download)

`npm install` - *the one command to rule them all*

1. Installation of node modules (specified in [package.json](package.json), mainly for Grunt build)
2. Installation of bower packages (specified in [bower.json](bower.json))
3. Production build (specified in Grunt [default task](Gruntfile.js))

In case of NPM network problems try EU mirror: `npm --registry http://registry.npmjs.eu/ install`


## Workflow

* `npm run-script build` - for project production build
* `npm start` - start of development work which builds project with DEV settings and then watches for file change


## FAQ

> How to make it work with *XYZ* PHP/Ruby/... framework?

Just move all files to project *document_root* directory and run commands from there. Done!
