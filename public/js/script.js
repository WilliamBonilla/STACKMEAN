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
      $scope.limpiarDatos();
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
            _id: $scope._id
         }
      }).success(function(data){
         if(typeof(data)=='object'){
            $scope.limpiarDatos();
            $scope.cargarClientes();
         }else{
            alert('ERROR AL INTENTAR GUARDAR EL CLIENTE');
         }
      }).error(function(){
         alert('ERROR AL INTENTAR GUARDAR EL CLIENTE');
      });
   };

   //Función recuperar cliente
   $scope.recuperarCliente = function(indice) {
      $http({
         method: 'GET',
         url: '/recuperar',
         params: {
            _id: indice
         }
      }).success(function(data){
         if(typeof(data)=='object'){
            $scope._id = data._id;
            $scope.nombre = data.nombre;
            $scope.apellido = data.apellido;
            $scope.domicilio = data.domicilio;
            $scope.telefono = data.telefono;
            $scope.email = data.email;
         }else{
            alert('ERROR AL INTENTAR RECUPERAR EL CLIENTE');
         }
      }).error(function(){
            alert('ERROR AL INTENTAR RECUPERAR EL CLIENTE');
      });
   };

   //Función eliminar cliente, recibe como parámetro el índice que tiene asignado el cliente
   $scope.eliminarCliente = function(indice) {
       $http({
         method: 'POST',
         url: '/eliminar',
         params: {
            _id: indice
         }
      }).
      success(function(data) {
         if(data == 'Ok'){
            $scope.limpiarDatos();
            $scope.cargarClientes();
         }else{
            alert('Error al intentar eliminar el cliente.');
         } 
      }).
      error(function() {
         alert('Error al intentar eliminar el cliente.');
      });
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
