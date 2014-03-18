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
		'build/*.*',
		'**/*.html'
	]

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		clean: {
			dist: 'build/**'
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

		browserSync: {

			dev: {
				options: {
					watchTask: true,
					debugInfo: true,
					// Only static files
					server: {
						baseDir: '.'
					},
					// Dynamic files (PHP etc) - proxy to running server
					// proxy: {
					// 	host: 'localhost'
					// },
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
				tasks: ['stylus:dev']
			},

			js: {
				files: ['js/**/*.js'],
				tasks: ['uglify:dev']
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
	grunt.loadNpmTasks('grunt-contrib-clean')
	grunt.loadNpmTasks('grunt-contrib-stylus')
	grunt.loadNpmTasks('grunt-contrib-uglify')
	grunt.loadNpmTasks('grunt-browser-sync')
	grunt.loadNpmTasks('grunt-contrib-watch')
	grunt.loadNpmTasks('grunt-notify')

	// Register tasks
	grunt.registerTask('default', ['clean:dist','stylus:dist', 'uglify:dist'])
	grunt.registerTask('dev', ['stylus:dev', 'uglify:dev', 'browserSync:dev', 'watch'])

}
