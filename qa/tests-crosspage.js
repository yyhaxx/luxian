var Browser = require('zombie'),
	assert = require('chai').assert;
var browser;
suite('页面跳转测试', function () {
	setup(function () {
		browser = new Browser();
	});
	test('"jiuqu-river"页面能否正常跳转到"request-group-rate"页面', function (done) {
		var referrer = 'http://127.0.0.1:3000/tours/jiuqu-river';
		browser.visit(referrer, function () {
			browser.clickLink('.requestGroupRate', function () {
				// 测试链接跳转，等待解决
				assert(browser.field('referrer'));
				done();
			});
		});
	});
	test('是否直接访问"request-group-rate"页面', function (done) {
		browser.visit('http://127.0.0.1:3000/tours/request-group-rate', function () {
			assert(browser.field('referrer').value === '');
			done();
		});
	});
});
