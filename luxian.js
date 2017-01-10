var express = require('express');
var fortune = require('./lib/fortune.js');

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

app.use(function (req, res, next) {
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	res.locals.copyrightYear = copyrightYear;
	next();
});

app.use(function (req, res, next) {
	if (!res.locals.partials) {
		res.locals.partials = {};
	}
	res.locals.partials.weather = 'getWeatherData()';
	// console.log(res.locals.partials.weather1.locations)
	next();
})

// 路由
app.get('/', function (req, res) {
	res.render('home');
});

app.get('/about', function (req, res) {
	res.render('about', {
		fortune: fortune.getFortune,
		pageTestScript: '/qa/tests-about.js',
	});
});

app.get('/tours/jiuqu-river', function (req, res) {
	res.render('tours/jiuqu-river');
});

app.get('/tours/request-group-rate', function (req, res) {
	res.render('tours/request-group-rate');
});

app.get('/api/tours', function (req, res) {
	var toursXml = '<?xml version="1.0"?><tours>' + tours.map(function (p) {
		return '<tour price="' + p.price +'" id="' + p.id + '">' + p.name + '</tour>';
	}).join('') + '</tours>';

	var toursText = tours.map(function (p) {
		return p.id + ': ' + p.name + ' (' + p.price + ')';
	}).join('\n');

	res.format({
		'application/json': function () {
			res.json(tours);
		},
		'application/xml': function () {
			res.type('application/xml');
			res.send(toursXml);
		},
		'text/xml': function () {
			res.type('text/xml');
			res.send(toursXml);
		},
		'text/plain': function () {
			res.type('text/plain');
			res.send(toursText);
		}
	});
});

// 更新tours api，等待检测
app.put('/api/tours:id', function (req, res) {
	var p = tours.some(function (p) {
		return p.id == req.params.id;
	});
	if (p) {
		if (req.query.name) {
			p.name = req.query.name;
		}
		if (req.query.price) {
			p.price = req.query.price;
		}
		res.json({success: true});
	} else{
		res.json({error: '这个地点不存在'});
	}
});

// 删除tours api，等待检测
app.delete('/api/tours:id', function (req, res) {
	var i;
	for (i = tours.length - 1; i >= 0; i--) {
		if (tours[i].id == req.params.id) {
			break;
		}
	}
	if (i >= 0) {
		tours.splice(i, 1);
		res.json({success: true});
	} else{
		res.json({error: '不存在这样的景点'});
	}
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




var tours = [
	{id: 0, name: 'YuChan mountain', price: 88.88},
	{id: 1, name: 'JuQu river', price: 99.88}
];
var copyrightYear = '2017';
function getWeatherData () {
	return {
		locations: [
			{
        		name: 'Portland',
        		forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
        		iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
        		weather: 'Overcast',
        		temp: '54.1 F (12.3 C)',
			},
			{
				name: 'Bend',
				forecastUrl: 'http://www.wunderground.com/US/OR/Bend.html',
				iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
				weather: 'Partly Cloudy',
				temp: '55.0 F (12.8 C)',
			},
			{
				name: 'Manzanita',
				forecastUrl: 'http://www.wunderground.com/US/OR/Manzanita.html',
				iconUrl: 'http://icons-ak.wxug.com/i/c/k/rain.gif',
				weather: 'Light Rain',
				temp: '55.0 F (12.8 C)',
			}
		],
	};
}



