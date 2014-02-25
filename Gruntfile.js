module.exports = function(grunt) {

	var STYLE_FILES = {
		'build/screen.css': 'styles/screen.styl'
	};

	var JS_FILES = {
		'build/app.js': [
			'js/plugins.js',
			'js/init.js'
		]
	};

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
					mangle: false,
					beautify: true,
					sourceMap: function(path) {
						return path + ".map";
					}
				},
				files: JS_FILES
			},

			dist: {
				files: JS_FILES
			}

		},

		browser_sync: {

			dev: {
				options: {
					watchTask: true,
					debugInfo: true,
					proxy: {
						host: '127.0.0.1'
					}
				},
				bsFiles: {
					src: ['build/*.css', 'build/*.js', '*.html']
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
			}

		}

	});

	// Load the plugins
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Register tasks
	grunt.registerTask('default', ['clean:dist','stylus:dist', 'uglify:dist']);
	grunt.registerTask('dev', ['stylus:dev', 'uglify:dev', 'browser_sync:dev', 'watch']);

};
