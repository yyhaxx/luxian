var express = require('express');
var fortune = require('./lib/fortune.js')

var app = new express();

// 设置handlebars视图引擎
var handlebars = require('express-handlebars').create({
	defaultLayout: 'main',
	extname: '.hbs',
});
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

// 路由
app.get('/', function (req, res) {
	res.render('home');
});

app.get('/about', function (req, res) {
	res.render('about', {
		fortune: fortune.getFortune,
	});
});

// 定制404页面
app.use(function (req, res) {
	res.status(404);
	res.render('404');
});

// 定制500页面
app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function () {
	console.log('this app start at ' + app.get('port'));
});

