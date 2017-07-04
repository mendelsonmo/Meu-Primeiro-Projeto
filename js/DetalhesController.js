angular.module('starter')
.controller('DetalhesController', function($scope, $state, $http, compartilharObj){


	var url = 'https://ws-sac.gpdtecnologia.com.br/'; 
	var id_app= "5880935fd4779ee0d202190e";
	$scope.id_usuario = window.localStorage.getItem('id_usuario');
	$scope.cartao_cidadao = window.localStorage.getItem('cartao_cidadao');
	$scope.hash = window.localStorage.getItem('HashUsuario');
	$scope.db = window.localStorage.getItem('db');
	$scope.nome_usuario = window.localStorage.getItem('nome_usuario');
	$scope.foto_usuario = window.localStorage.getItem('foto_usuario');
	$scope.cidade_usuario = window.localStorage.getItem('cidade_usuario');

	$scope.detalheProtocolo = compartilharObj.get();
	console.log($scope.detalheProtocolo);

	//responsável por listar o comentário
	$scope.comentarios = [];
	$http.get(url + 'Info/comments/1/' + $scope.db + '/' + $scope.detalheProtocolo.id_protocolo + '?id_usuario=' + $scope.id_usuario + '&id_app=' + id_app)
	.success(function(comentarios){
		$scope.comentarios = comentarios.data;
		console.log(comentarios);
	})
	.error(function(error){
		console.log(error);
	});

	//Responsável por enviar o comentário
	$scope.comentario = {};
	$scope.comentar = function(comentario){

		var respComentario = {
			"id_app":  "5880935fd4779ee0d202190e",
			"data": {
				"data_hora": 1470904205,
				"id_usuario": $scope.id_usuario,
				"comentario": $scope.comentario.valor
			}
		};

		console.log(respComentario);

		$http.put(url + 'UserActions/insertComment/' + $scope.db + '/' + $scope.detalheProtocolo.id_protocolo, respComentario)
		.success(function(response){
			console.log(response);
		}).error(function(error){
			console.log(error);
		});

	};

	//Excluir comentário
	$scope.excluirComentario = function(comentario){
		alert(comentario);
		console.log(comentario);
	};

	//Define falso enquanto o botão de like e dislike não forem ativados
	$scope.isActiveOne = false;
	$scope.isActiveTwo = false;

	//responsável pelo botão de like
	$scope.gostei = function(){

		var respGostei = {
			"id_app":  "5880935fd4779ee0d202190e",
			"data": {
				"data_hora": 1470904205,
				"id_usuario": $scope.id_usuario
			}
		};

		$http.put(url + 'UserActions/toggleLike/' + $scope.db + '/' + $scope.detalheProtocolo.id_protocolo, respGostei)
		.success(function(response){
			$scope.isActiveOne = !$scope.isActiveOne;
			console.log(response);
		}).error(function(error){
			console.log(error);
		});

	};

	//responsável pelo botão de dislike
	$scope.naoGostei = function(){

		var respNaoGostei = {
			"id_app":  "5880935fd4779ee0d202190e",
			"data": {
				"data_hora": 1470904205,
				"id_usuario": $scope.id_usuario
			}
		};

		$http.put(url + 'UserActions/toggleDontLike/' + $scope.db + '/' + $scope.detalheProtocolo.id_protocolo, respNaoGostei)
		.success(function(response){
			$scope.isActiveTwo = !$scope.isActiveTwo;
			console.log(response);
		}).error(function(error){
			console.log(error);
		});
	};

	//responsável por listar quem gostou da publicação
	$scope.userLikes = [];
	$http.get(url + 'Info/likes/'+ $scope.hash + '/' + $scope.db + '/' + $scope.detalheProtocolo.id_protocolo + '?id_usuario=' + $scope.id_usuario + '&id_app=' + id_app)
	.success(function(userLikes){
		$scope.userLikes = userLikes.data;
		console.log(userLikes)
	}).error(function(error){
		console.log(error);
	});

	//responsável por listar quem gostou da publicação
	$scope.userDislikes = [];
	$http.get(url + 'Info/dislikes/'+ $scope.hash + '/' + $scope.db + '/' + $scope.detalheProtocolo.id_protocolo + '?id_usuario=' + $scope.id_usuario + '&id_app=' + id_app)
	.success(function(userDislikes){
		$scope.userDislikes = userDislikes.data;
		console.log(userDislikes)
	}).error(function(error){
		console.log(error);
	});

});