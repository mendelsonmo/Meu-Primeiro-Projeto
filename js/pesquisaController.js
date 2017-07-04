angular.module('starter').controller('PesquisaController', function($scope, $state, $http,compartilharObj, $ionicHistory){
	$scope.nome_usuario = window.localStorage.getItem('nome_usuario');
	$scope.foto_usuario = window.localStorage.getItem('foto_usuario');
	$scope.cidade_usuario = window.localStorage.getItem('cidade_usuario');
	//Recupera os dados passados pelo service "compartilhaObj"
	$scope.dados = compartilharObj.get();
	console.log($scope.dados);

	//Responsável por enviar a mensagem de erro, caso receba alguma
	$scope.mensagem = '';

	$scope.voltar = function(){
		$ionicHistory.goBack();
	}
	
	//Botões
	$scope.maisTarde = function(){
		$state.go('tabs.notificacoes');
	}

	$scope.iniciarPesquisa = function(){
		$state.go('tabs.iniciaPesquisa');
	}
});