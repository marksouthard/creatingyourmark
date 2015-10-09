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

		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: {
					'dist/index.html': 'src/index.html',
					'dist/projects.html': 'src/projects.html'
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
				tasks: ['processcss'],
				options: {
					spawn: false
				}
			},
			html: {
				files: ['src/*.html'],
				tasks: ['processcss', 'htmlmin'],
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
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', ['scsslint', 'sass', 'autoprefixer', 'cssmin', 'watch']);
	grunt.registerTask('processcss', ['scsslint', 'sass', 'autoprefixer', 'cssmin'])
	grunt.registerTask('build', ['sass', 'autoprefixer', 'cssmin', 'htmlmin', 'copy']);
};
