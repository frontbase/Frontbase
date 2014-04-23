module.exports = function(grunt) {

	var STYLE_FILES = {
		'build/screen.css': 'styles/screen.styl'
	}

	var JS_FILES = {
		'build/app.js': [
			'js/plugins.js',
			'js/init.js'
		]
	}

	var WATCH_FILES = [
		'build/*'
	]

	// Additional sources to hash filenames
	var HASH_SOURCES = []

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		//
		clean: {
			dist: 'build/*'
		},

		stylus: {

			dev: {
				options: {
					'include css': true,
					compress: false
				},
				files: STYLE_FILES
			},

			dist: {
				options: {
					'include css': true
				},
				files: STYLE_FILES
			}

		},

		uglify: {

			dev: {
				options: {
					compress: false,
					sourceMap: true
				},
				files: JS_FILES
			},

			dist: {
				files: JS_FILES
			}

		},

		'compile-handlebars': {

			dist: {
				template: 'templates/*.hbs',
				templateData: 'templates/data.json',
				partials: 'templates/partials/*.hbs',
				output: 'build/*.html'
			}

		},

		hashres: {

			dist: {
				src: (function() {
					for(style in STYLE_FILES){
						HASH_SOURCES.push(style)
					}
					for(script in JS_FILES){
						HASH_SOURCES.push(script)
					}
					return HASH_SOURCES
				})(),
				dest: 'build/*.html'
			}

		},

		browserSync: {

			dev: {
				options: {
					watchTask: true,
					debugInfo: true,
					// Only static files
					server: {
						baseDir: '.',
						index: 'build/index.html'
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

		watch: {

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

	// Load the plugins
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
