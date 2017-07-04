angular.module('starter')
.controller('FiltroController', function($scope, $state){
	$scope.voltarHome = function(){
		$state.go('tabs.home');
	};

	$scope.nome_usuario = window.localStorage.getItem('nome_usuario');
	$scope.foto_usuario = window.localStorage.getItem('foto_usuario');
	$scope.cidade_usuario = window.localStorage.getItem('cidade_usuario');
});