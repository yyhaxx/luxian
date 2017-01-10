var fortunes = [
	'大意失荆州',
	'站在巨人肩膀上',
	'春风得意马蹄疾',
	'范进中举',
];
exports.getFortune = function () {
	return fortunes[Math.floor(Math.random() * fortunes.length)];
};