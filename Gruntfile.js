module.exports = function (grunt) {
	
	// 加载插件
	[
		'grunt-cafe-mocha',
		'grunt-contrib-jshint',
		'grunt-exec'
	].forEach(function (task) {
		grunt.loadNpmTasks(task);
	});

	// 配置插件
	grunt.initConfig({
		cafemocha: {
			all: {
				src: 'qa/tests-*.js',
				options: {ui: 'tdd'},
			}
		},
		jshint: {
			app: ['luxian.js', 'public/js/**/*.js', 'lib/**/*.js'],
			qa: ['public/qa/**/*.js', 'Gruntfile.js', 'qa/**/*.js'],
		},
		exec: {
			linkchecker: {
				cmd: 'linkchecker http://127.0.0.1:3000'
			}
		}
	});

	// 注册任务
	// 暂时不能测试linkchecker
	grunt.registerTask('default', ['cafemocha', 'jshint']);
};