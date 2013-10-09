module.exports = function(grunt) {

	var SASS_FILES = {
		'build/screen.css': 'sass/screen.sass'
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

		sass: {

			dev: {
				options: {
					sourcemap: true
				},
				files: SASS_FILES
			},

			dist: {
				options: {
					style: 'compressed',
					noCache: true
				},
				files: SASS_FILES
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
				options: {
					report: 'min'
				},
				files: JS_FILES
			}

		},

		watch: {

			sass: {
				files: 'sass/**/*.sass',
				tasks: ['sass:dev']
			},

			js: {
				files: ['js/*.js'],
				tasks: ['uglify:dev']
			},

			livereload: {
				files: ['build/*.css', 'build/*.js'],
				options: {
					livereload: true,
				}
			}

		},

		styleguide: {

			frontend: {
				options: {
					name: 'Styleguide',
					framework: {
						name: 'styledocco'
					},
					template: {
						include: ['build/screen.css']
					}
				},
				files: {
					'docs': 'sass/screen.sass'
				}
			}
		}


	});

	// Load the plugins
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-styleguide');

	// Default task(s).
	grunt.registerTask('default', ['clean:dist','sass:dist', 'uglify:dist', 'styleguide']);
	grunt.registerTask('dev', ['sass:dev', 'uglify:dev', 'watch']);

};
