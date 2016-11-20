var express = require("express");
var pug = require("pug");
var app = express();
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/views/public'));
var fortune = require('./lib/fortune.js');

app.get('/', function(req, res) {
	res.render("home");
});

var fortunes = [
	"Победи свои страхи, или они победят тебя.",
	"Рекам нужны истоки.",
	"Не бойся неведомого.",
	"Тебя ждет приятный сюрприз.",
	"Будь проще везде, где только можно.",
];

app.get('/about', function(req, res) {
	res.render('about', { fortune: fortune.getFortune() });
});

// пользовательская страница 404
app.use(function(req, res, next) {
	res.status(404);
	res.render("404");
});

// пользовательская страница 505
app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500);
	res.render("500");
});

app.listen(app.get('port'), function() {
	console.log('Express запущен на http://localhost:' +
		app.get('port') + '; нажмите Ctrl+C для завершения.');
});
