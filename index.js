// express, http 모듈을 로드
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const keys = require('./keys.json');
const MessageController = require('./controllers/MessageController');

// express 사용하여 http 서버를 만든다
var app = express();
var httpServer = http.createServer(app);

// use body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// the server will use ejs to generate html
// all ejs files are in /views
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// 'get' method, '/' url
app.get('/', function(req, res) {
	res.render('test.ejs');
});

// 'get' method, '/message' url
app.get('/message', function(req, res) {
	MessageController.findMessage(res);
});

// 'post' method, '/message' url
app.post('/message', function(req, res) {
	let message = req.body.message;
	let author = req.body.author;

	MessageController.createMessage(message, author);

	console.log('User say: ' + message + 'and the author is: ' + author);
	res.send('Server got a message: ' + message);
});

// 'put' method, '/message' url
app.put('/message', function(req, res) {
	let message = req.body.message;
	let author = req.body.author;

	MessageController.updateMessage(message, author);

	console.log('update message: ' + message + 'where the author is: ' + author);
	res.send('Update tried');
});

// 'delete' method, '/message' url
app.delete('/message', function(req, res) {
	MessageController.deleteMessage(res);
});

// DB 연결
mongoose.connect(keys.mongoDB, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	createIndexes: true
}, function(err) {
	if (err) {
		// DB연결 시 에러가 있었으면 그 에러를 출력하자
		console.log(err);
	} else {
		// DB연결 시 에러가 없었으면, 서버를 시작하자
		httpServer.listen(keys.port);
		console.log('서버가 정상적으로 켜졌어요!');
	}
});
