# Frontbase :sparkles:

*a starter fuel for web projects* :rocket:


## Requirements

* [Node.js](http://nodejs.org/download)
* [Ruby](https://www.ruby-lang.org/en/downloads) + [SASS](http://sass-lang.com/download.html)
* [Grunt CLI](http://gruntjs.com/getting-started)
* [Bower](http://bower.io)

```sh
gem install sass --pre
npm install -g grunt-cli bower
```


## Initialization

```sh
npm install # installs node modules specified in package.json (mainly for Grunt build)
bower install # installs bower libraries specified in bower.json
```


## Workflow

Follow [Frontbase ideology](https://github.com/Clevis/Clevispace/wiki/Frontbase) and write a perfect, well documented code

* `grunt` - for project production build
* `grunt dev` - start of development work which builds project with DEV settings and then watches for file change (livereload included)

## Documentation

Using [StyleDocco](http://jacobrask.github.io/styledocco/) which parses stylesheet comments with markdown and generates one page per file.

* `/docs` - styleguide location (build project first)

## FAQ

> How to make it work with *XYZ* PHP/Ruby/... framework?

Just move all files to project *document_root* directory and run commands from there. Done!
