module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {
			dist: {
				options: {
					style: 'expanded',
					cacheLocation: 'src/sass/.sass-cache'
				},
				files: {
					'dist/css/style.css': 'src/sass/style.scss'
				}
			}
		},

		cssmin: {
			dist: {
				files: {
					'dist/css/style.min.css': 'dist/css/style.css'
				}
			}
		},

		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: {
					'dist/index.html': 'src/index.html'
				}
			}
		},

		watch: {
			options: {
				livereload: true
			},
			css: {
				files: ['src/sass/*.scss'],
				tasks: ['sass', 'cssmin'],
				options: {
					spawn: false
				}
			},
			html: {
				files: ['src/index.html'],
				tasks: ['htmlmin'],
				options: {
					spawn: false
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['sass', 'cssmin', 'htmlmin']);
};