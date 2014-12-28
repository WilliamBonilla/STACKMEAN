var express = require('express');
var path = require('path');
var app = express();
app.use(express.Router());
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
   res.sendFile('public/index.html');
});

var server = app.listen(3000, function () {

  var host = server.address().ip;
  var port = server.address().port;
// || "127.0.0.1";
  console.log('Application listen on 127.0.0.1 PORT %s',port);

});