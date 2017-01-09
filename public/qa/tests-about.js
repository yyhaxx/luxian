suite('"about"页面测试', function () {
	test('存在到"contact"页面的链接点', function () {
		assert($('a[href="/contact"]').length);
	});
});