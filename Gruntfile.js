module.exports = function(grunt) {
	'use strict';
	grunt.initConfig({

		handlebarslayouts: {
		  dev: {
		    files: {
		      'dist/*.html': 'src/*.html',
		      'dist/pages/*.html': 'src/pages/*.html',
		      'dist/assets/css/bootstrap.css': 'node_modules/bootstrap/dist/css/bootstrap.css',
		      'dist/assets/js/bootstrap.js': 'node_modules/bootstrap/dist/js/bootstrap.js',
		      'dist/assets/css/custom.css': 'src/assets/css/custom.css'
		    },
		    options: {
		      partials: ['src/partials/*.hbs','src/layouts/layout.html'],
		      basePath: 'src/',
		      modules: ['handlebars-helpers'],
		      context: {
		        title: 'Layout',
		        projectName: 'Creating your own Bootstrap Theme',
		        items: [
		          'apple',
		          'orange',
		          'banana'
		        ]
		      }
		    }
		  }
		},

		copy: {
			main: {
				expand: true,
				flatten: true,
				src: 'src/assets/images/*',
				dest: 'dist/assets/images/',
				filter: 'isFile'
			},
		},

	    connect: {
	      server: {
	        options: {
	          livereload: true,
	          port: 8000,
	          base:'dist/',
	          open: true
	        }
	      }
	    },

	    watch: {
	      layout: {
	        files: 'src/layouts/layout.html',
	        tasks: 'handlebarslayouts:dev'
	      },
	      hbs: {
	        files: 'src/**/*.hbs',
	        tasks: 'handlebarslayouts:dev'
	      },
	      css: {
	        files: 'src/**/*.css',
	        tasks: 'handlebarslayouts:dev'
	      },
	      js: {
	        files: 'src/**/*.js',
	        tasks: 'handlebarslayouts:dev'
	      },
	      options: {
	        livereload: true
	      }
	    },

	});

	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks("grunt-handlebars-layouts");

	grunt.registerTask('default', ['handlebarslayouts']);
	grunt.registerTask('serve', ['handlebarslayouts', 'copy', 'connect:server', 'watch']);

}