module.exports = function (grunt) {

	var foundationPath = 'node_modules/foundation-sites/';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				options: {
					style: 'expanded',
					loadPath: [foundationPath + 'scss']
				},
				files: {
					'Resources/Public/Build/main.css': 'Resources/Private/FrontendSources/sass/app.scss'
				}
			}
		},
		uglify: {
			libs: {
				files: {
					'Resources/Public/Build/main.js': [
						foundationPath + 'vendor/jquery/dist/jquery.js',
						foundationPath + 'dist/foundation.js',
						'Resources/Private/FrontendSources/javascript/jQuery.*.js',
						'Resources/Private/FrontendSources/javascript/app.js'
					]
				}
			}
		},
        watch: {
            css: {
                files: ['Resources/Private/FrontendSources/sass/*.scss', 'Resources/Private/FrontendSources/sass/*/*.scss', 'Resources/Private/FrontendSources/sass/*/*/*.scss'],
                tasks: ['sass']
            },
			js: {
				files: ['Resources/Private/FrontendSources/javascript/*.js'],
				tasks: ['uglify']
			}
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('build', ['sass', 'uglify']);
    grunt.registerTask('default', ['build', 'watch']);
};
