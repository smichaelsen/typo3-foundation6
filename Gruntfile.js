module.exports = function (grunt) {

	var foundationPath = 'node_modules/foundation-sites/';

	var backPath = '../../../';
	var loadPaths = [];
	var scssWatchPaths = [
		'Resources/Private/FrontendSources/sass/*.scss',
		'Resources/Private/FrontendSources/sass/*/*.scss',
		'Resources/Private/FrontendSources/sass/*/*/*.scss'
	];

	var typo3FoundationConfigFile = '../../../foundation6.json';
	if (grunt.file.exists(typo3FoundationConfigFile)) {
		var typo3FoundationConfig = grunt.file.readJSON(typo3FoundationConfigFile);
		if (typo3FoundationConfig.foundationSettingsPath) {
			loadPaths.push(backPath + typo3FoundationConfig.foundationSettingsPath);
			scssWatchPaths.push(backPath + typo3FoundationConfig.foundationSettingsPath + '*.scss');
			scssWatchPaths.push(backPath + typo3FoundationConfig.foundationSettingsPath + '*/*.scss');
			scssWatchPaths.push(backPath + typo3FoundationConfig.foundationSettingsPath + '*/*/*.scss');
		}
	}

	loadPaths.push(foundationPath + 'scss');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				options: {
					style: 'expanded',
					loadPath: loadPaths
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
						'Resources/Private/FrontendSources/javascript/app.js'
					]
				}
			}
		},
        watch: {
            css: {
                files: scssWatchPaths,
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
