var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var exec = require('child_process').exec;
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
 	var result = exec(__dirname + '/upload/compile.sh '+ val[0],function (error, stdout, stderr) {
    	if(stderr){
    		console.log('galat h');
    		res.send(404);
    	}else{
    		console.log('sahi h');
    		res.send(200);
    	}
    	if (error !== null) {
      		console.log('exec error: ' + error);
    	}
	});
});
app.listen(8080);
