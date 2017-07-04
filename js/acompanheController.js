angular.module('starter')
.controller('AcompanheController', function($scope, $state, $http){


	//Recupera a chave e o id do usuario do localstorage
	$scope.hash = window.localStorage.getItem('HashUsuario');
	$scope.id_usuario = window.localStorage.getItem('id_usuario');
	$scope.cartao_cidadao = window.localStorage.getItem('cartao_cidadao');
	$scope.db = window.localStorage.getItem('db');
	$scope.nome_usuario = window.localStorage.getItem('nome_usuario');
	$scope.foto_usuario = window.localStorage.getItem('foto_usuario');
	$scope.cidade_usuario = window.localStorage.getItem('cidade_usuario');

	var Id_usuario = "57fd46724cad07d94ec297f9";
	var Cartao_cidadao = "709.117.388.250.555";
	var urlListar = "https://ws-sac.gpdtecnologia.com.br/Info/followUpRequests/1/" + $scope.db + "/"+ $scope.id_usuario +"?id_app=5880935fd4779ee0d202190e&cartao_cidadao=" + $scope.cartao_cidadao; 


	
	$scope.protocoloAcompanhados = [];
	$http.get(urlListar,{ headers: { 'Content-Type': 'application/json' } })
	.success(function(protocoloAcompanhados){
		$scope.protocoloAcompanhados =  protocoloAcompanhados.data
		console.log(protocoloAcompanhados);
	 })
	.error(function(error){
		console.log(error);
	});

	$scope.filtrar = function(){
		$state.go('tabs.filtros');
	};
});