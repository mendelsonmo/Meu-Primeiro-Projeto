angular.module('starter').controller('PerfilController', function($http, $scope, $state, md5){
	// $scope.salvar = function(){
	// 	$state.go('tabs.home');
	// };

	$scope.hash = window.localStorage.getItem('HashUsuario');
	$scope.id_usuario = window.localStorage.getItem('id_usuario');
	$scope.nome_usuario = window.localStorage.getItem('nome_usuario');
	$scope.foto_usuario = window.localStorage.getItem('foto_usuario');
	$scope.cidade_usuario = window.localStorage.getItem('cidade_usuario');

	var url = "https://ws-login.gpdtecnologia.com.br/";

	$scope.dadosUsuario = {};
	$http.get(url + "Account/basicDataUser/" + $scope.hash + '/' + $scope.id_usuario + "?id_app=5880935fd4779ee0d202190e",
		{ headers: { 'Content-Type': 'application/json' } })
	.success(function(result){
		$scope.dadosUsuario = result.data;
		console.log(result);
	})
	.error(function(error){
		console.log(error);
	});

	$scope.dadosUsuario = {};

	//responsável por fazer a encriptação da senha antes de enviar para a api
	$scope.$watch('dadosUsuario.nova_senha', function(){
		$scope.nova_senha = md5.createHash($scope.dadosUsuario.nova_senha || '');
	});

	$scope.perfilForm = function(){

		var dataUser = {
			"h" : "jdlk2m1m28md92290",
			"id_app":  "5880935fd4779ee0d202190e",
			"data": {
				"data_hora": 1470904205,
				"email": $scope.dadosUsuario.email,
				"senha": $scope.dadosUsuario.nova_senha,
				"sexo": $scope.dadosUsuario.sexo,
				"nome": $scope.dadosUsuario.nome,
				"data_nasc": $scope.dadosUsuario.data_nasc,
				"nome_mae": $scope.dadosUsuario.nome_mae,
				"celular": $scope.dadosUsuario.celular,
			}
		};

		$http.put(url + "Account/updateAccount/" + $scope.id_usuario, dataUser, 
			{ headers: { 'Content-Type': 'application/json' } })
		.success(function(result){
			console.log(dataUser);
			console.log(result);

		})
		.error(function(error){
			console.log(error);
		});
		
	};
});