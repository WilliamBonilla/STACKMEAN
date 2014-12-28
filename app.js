var express = require('express');
var path = require('path');
var app = express();
app.use(express.Router());
app.use(express.static(__dirname + '/public'));
var terminal = require('color-terminal');
var clienteJs = require('./lib/db.js')

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/personas', function(error){
   if(error){
      throw error; 
   }else{
      console.log('Conectado a MongoDB');
   }
});
var Cliente = clienteJs(mongoose);

app.get('/', function(req, res){
   res.sendfile('./public/index.html');
});
app.get('/listar', function(req, res){
   Cliente.find({}, function(error, clientes){
      if(error){
         res.send('Error.');
      }else{
         res.send(clientes);
      }
   })
});
app.get('/recuperar', function(req, res){
   Cliente.findById(req.query._id, function(error, documento){
      if(error){
         res.send('Error.');
      }else{
         res.send(documento);
      }
   });
});
app.post('/guardar', function(req, res){
   if(req.query._id == null){
      //Inserta
      var cliente = new Cliente({
         nombre: req.query.nombre,
         apellido: req.query.apellido,
         domicilio: req.query.domicilio,
         telefono: req.query.telefono,
         email: req.query.email
      });
      cliente.save(function(error, documento){
         if(error){
            res.send('Error.');
         }else{
            res.send(documento);
         }
      });
   }else{
      //Modifica
      Cliente.findById(req.query._id, function(error, documento){
         if(error){
            res.send('Error al intentar modificar el personaje.');
         }else{
            var cliente = documento;
            cliente.nombre = req.query.nombre,
            cliente.apellido = req.query.apellido,
            cliente.domicilio = req.query.domicilio,
            cliente.telefono = req.query.telefono,
            cliente.email = req.query.email
            cliente.save(function(error, documento){
               if(error){
                  res.send('Error.');
               }else{ 
                  res.send(documento);
               }
            });
         }
      });
   }
});
app.post('/eliminar', function(req, res){
   Cliente.remove({_id: req.query._id}, function(error){
      if(error){
         res.send('Error.');
      }else{
         res.send('Ok');
      }
   });
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
