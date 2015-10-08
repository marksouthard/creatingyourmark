module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		scsslint: {
			allFiles: [
				'src/sass/*.scss'
			],
			options: {
				config: '.scss-lint.yml'
			}
		},

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

		autoprefixer: {
			options: {
				map: true
			},
			dist: {
				files: {
					'dist/css/style.css': 'dist/css/style.css'
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

		inline: {
			options: {
				cssmin: false,
				uglify: false
			},
			dist: {
				src: 'src/index.html',
				dest: 'dist/index.html'
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

		copy: {
			main: {
				files: [
					{
						expand: true,
						src: ['src/img/*'],
						dest: 'dist/img',
						filter: 'isFile',
						flatten: true
					}
				]
			}
		},

		watch: {
			options: {
				livereload: true
			},
			css: {
				files: ['src/sass/*.scss'],
				tasks: ['scsslint', 'sass', 'cssmin'],
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

	grunt.loadNpmTasks('grunt-scss-lint');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-inline');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', ['scsslint', 'sass', 'autoprefixer', 'cssmin', 'htmlmin', 'watch']);
	grunt.registerTask('build', ['sass', 'autoprefixer', 'cssmin', 'inline', 'htmlmin', 'copy']);
};
