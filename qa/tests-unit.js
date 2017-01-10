var fortune = require('../lib/fortune.js');
var expect = require('chai').expect;
suite('运气功能测试', function () {
	test('运气测试是否返回一个随机值', function () {
		expect(typeof fortune.getFortune() === 'string');
	});
});