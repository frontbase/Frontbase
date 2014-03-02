# Frontbase :sparkles:

*a starter fuel for web projects* :rocket:

## Initialization

Requirements: [Node.js](http://nodejs.org/download)


`npm install` - *the one command to rule them all*

1. Installation of node modules (specified in [package.json](package.json), mainly for Grunt build)
2. Installation of bower packages (specified in [bower.json](bower.json))
3. Production build (specified in Grunt [default task](Gruntfile.js))

In case of NPM network problems try EU mirror: `npm --registry http://registry.npmjs.eu/ install`

## Workflow

Follow [Code Conventions](https://github.com/Clevis/Frontbase/wiki/Code-Conventions) and write a perfect, well documented code.

* `npm run-script build` - for project production build
* `npm start` - start of development work which builds project with DEV settings and then watches for file change (browser-sync included)


## FAQ

> How to make it work with *XYZ* PHP/Ruby/... framework?

Just move all files to project *document_root* directory and run commands from there. Done!
