/**
 * Configuration part of following grunt tasks
 */

var STYLE_FILES = [
	'styles/screen.styl'
]

var JS_FILES = [
	'js/plugins.js',
	'js/init.js'
]

var DIST_FOLDER = 'build'

var HASH_SOURCES = [
	DIST_FOLDER + '/*.css',
	DIST_FOLDER + '/*.js'
]

var WATCH_FILES = [
	DIST_FOLDER + '/*'
]


/**
 * Grunt project itself with defined tasks and theirs options
 */
module.exports = function(grunt) {
	grunt.initConfig({

		// Clean dist folder from obsolote files
		clean: {
			dist: DIST_FOLDER + '/*'
		},

		// Compile Stylus styles into CSS
		stylus: {

			dev: {
				options: {
					'include css': true,
					compress: false
				},
				expand: true,
				flatten: true,
				src: STYLE_FILES,
				dest: DIST_FOLDER + '/',
				ext: '.css'
			},

			dist: {
				options: {
					'include css': true
				},
				expand: true,
				flatten: true,
				src: STYLE_FILES,
				dest: DIST_FOLDER + '/',
				ext: '.css'
			}

		},

		// Concat and minify JavaScript files to signel app.js file
		uglify: {

			dev: {
				options: {
					compress: false,
					sourceMap: true
				},
				files: (function() {
					var files = {}
					files[DIST_FOLDER + '/app.js'] = JS_FILES
					return files
				})()
			},

			dist: {
				files: (function() {
					var files = {}
					files[DIST_FOLDER + '/app.js'] = JS_FILES
					return files
				})()
			}

		},

		// Generate static HTML files from Handlebars templates
		'compile-handlebars': {

			dist: {
				template: 'templates/*.hbs',
				templateData: 'templates/data.json',
				partials: 'templates/partials/*.hbs',
				output: DIST_FOLDER + '/*.html'
			}

		},


		// Rename resource files based on theirs content to prevent cache colisions
		hashres: {

			dist: {
				// expand: true,
				src: HASH_SOURCES,
				dest: DIST_FOLDER + '/*.html'
			}

		},

		// Development mode with resources auto reload and browser actions synchronizations
		browserSync: {

			dev: {
				options: {
					watchTask: true,
					debugInfo: true,
					// Only static files
					server: {
						baseDir: '.',
						index: DIST_FOLDER + '/index.html'
					},
					// Dynamic files (PHP etc) - proxy to running server
					// proxy: 'localhost',
					ghostMode: {
						clicks: true,
						scroll: true,
						links: false,
						forms: true
					}
				},
				bsFiles: {
					src: WATCH_FILES
				}
			}

		},

		// Watch sources for change and compile them. Starts Livereload server as fallback of browserSync.
		watch: {

			options: {
				spawn: false
			},

			styles: {
				files: 'styles/**/*.styl',
				tasks: 'stylus:dev'
			},

			js: {
				files: 'js/**/*.js',
				tasks: 'uglify:dev'
			},

			templates: {
				files: 'templates/**',
				tasks: 'compile-handlebars:dist'
			},

			livereload: {
				files: WATCH_FILES,
				options: {
					livereload: true
				}
			}

		}

	})

	// Load plugins
	grunt.loadNpmTasks('grunt-browser-sync')
	grunt.loadNpmTasks('grunt-compile-handlebars')
	grunt.loadNpmTasks('grunt-contrib-clean')
	grunt.loadNpmTasks('grunt-contrib-stylus')
	grunt.loadNpmTasks('grunt-contrib-uglify')
	grunt.loadNpmTasks('grunt-contrib-watch')
	grunt.loadNpmTasks('grunt-hashres')
	grunt.loadNpmTasks('grunt-notify')

	// Register tasks
	grunt.registerTask('default', ['clean:dist', 'compile-handlebars:dist', 'stylus:dist', 'uglify:dist', 'hashres:dist'])
	grunt.registerTask('dev', ['clean:dist', 'compile-handlebars:dist', 'stylus:dev', 'uglify:dev', 'browserSync:dev', 'watch'])

}
