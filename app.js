var express = require('express');
var path = require('path');
var app = express();
app.use(express.Router());
app.use(express.static(__dirname + '/public'));
var terminal = require('color-terminal');

app.get('/', function(req, res){
   res.sendFile('public/index.html');
});

var server = app.listen(3000, function () {

  var host = server.address().ip;
  var port = server.address().port;
// || "127.0.0.1";
  terminal.colorize('%_ %r').write('\nNinja Web Corporation S.A de C.V');
  terminal.colorize('%G').write('\nDesarrollo con STACK MEAN');
  terminal.colorize('%N');
  console.log('\n\nApplication listen on 127.0.0.1 PORT: %s',port);
  terminal.colorize('%_ %p').write('\nPress Ctrl+C to Stop Server\n\n');
  terminal.colorize('%N');
});