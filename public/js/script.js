var application = angular.module('application',[]);

application.controller('Clientes',function($scope, $http){

   $scope._id =null;
   $scope.nombre = '';
   $scope.apellido = ''
   $scope.domicilio = '';
   $scope.telefono = '';
   $scope.email = '';
   $scope.clientes = [];

   $scope.cargarClientes = function(){
      $http({
         method: 'GET', url: '/listar'
      }).
      success(function(data) {
         if(typeof(data) == 'object'){
            $scope.clientes = data;
         }else{
            alert('Error al intentar recuperar los clientes.');
         }
      }).
      error(function() {
         alert('Error al intentar recuperar los clientes.');
      });
   };

   //Función guardar cliente
   $scope.guardarCliente = function() {
      $http({
         method: 'POST',
         url: '/guardar',
         params:{
            nombre: $scope.nombre,
            apellido: $scope.apellido,
            domicilio: $scope.domicilio,
            telefono: $scope.telefono,
            email: $scope.email,
            _id: $scope.id
         }
      }).success(function(data){
         if(typeof(data)=='object'){
           // $scope.limpiarDatos();
            $scope.cargarClientes();
         }else{
            alert('ERROR AL INTENTAR GUARDAR EL CLIENTE');
         }
      }).error(function(){
         alert('ERROR AL INTENTAR GUARDAR EL CLIENTE');
      });
   };

   //Función recuperar cliente
   $scope.recuperarCliente = function(index) {
      $scope._id = index;
      $scope.nombre = $scope.clientes[index].nombre;
      $scope.apellido = $scope.clientes[index].apellido;
      $scope.domicilio = $scope.clientes[index].domicilio;
      $scope.telefono = $scope.clientes[index].telefono;
      $scope.email = $scope.clientes[index].email;
   };

   //Función eliminar cliente, recibe como parámetro el índice que tiene asignado el cliente
   $scope.eliminarCliente = function(indice) {
      var clientes_actualizado = [];
      for (var i = 0; i < $scope.clientes.length; i++) {
         if (i != indice) {
            clientes_actualizado.push($scope.clientes[i]);
         }
      }
      $scope.clientes = clientes_actualizado;
   };

   //Función que limpia los datos
   $scope.limpiarDatos = function() {
      $scope._id = null;
      $scope.nombre = '';
      $scope.apellido = '';
      $scope.domicilio = '';
      $scope.telefono = '';
      $scope.email = '';
   };

});
