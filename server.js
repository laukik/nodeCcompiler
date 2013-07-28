var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var spawn = require('child_process').spawn;
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser({ keepExtensions: true,uploadDir: __dirname + '/upload'}));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(__dirname, '/'));
app.get("/", function(req, res){
  res.sendfile("index.html");
});
app.post('/upload', function(req, res) {
 	var val = [];
 	val[0] = req.files.image.path;
 	console.log(val);
 	var result = spawn('./upload/compile',val);
 	console.log('sssdddddddddddddddd');
 	result.stdout.on('data',function(data){
 		console.log('next to execute');
 		res.sendfile('index.html');
 	});
 	result.stderr.on('data',function(data){
 		console.log('compilation error');

 	});
});
app.listen(8080);
