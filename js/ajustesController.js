angular.module('starter').controller('AjustesController', function($scope, $state, $http){
	$scope.perfil = function(){
		$state.go('tabs.perfil');
	};

	$scope.nome_usuario = window.localStorage.getItem('nome_usuario');
	$scope.foto_usuario = window.localStorage.getItem('foto_usuario');
	$scope.cidade_usuario = window.localStorage.getItem('cidade_usuario');

});