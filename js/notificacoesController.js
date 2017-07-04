angular.module('starter').controller('NotificacoesController', function($scope, $state, $http, $stateParams,compartilharObj){

	//Responsável por enviar a mensagem de erro, caso receba alguma
	 $scope.mensagem = '';

	//Recupera a chave e o id do usuario do localstorage
	$scope.hash = window.localStorage.getItem('HashUsuario');
	$scope.id_usuario = window.localStorage.getItem('id_usuario');
	$scope.nome_usuario = window.localStorage.getItem('nome_usuario');
	$scope.foto_usuario = window.localStorage.getItem('foto_usuario');
	$scope.cidade_usuario = window.localStorage.getItem('cidade_usuario');
	
	//Realiza a montagem da url de acordo com os parámentros e realiza a listagem das notificações
	var limit = 15;
	var offset = 0;
	var urlNotificacoes = "https://ws-login.gpdtecnologia.com.br/Notification/check/" + $scope.hash + "/" + $scope.id_usuario + "?" + "limit=" + limit + "&offset=" + offset+"&id_app=5880935fd4779ee0d202190e";

	$scope.notificacoes = [];
	$http.get(urlNotificacoes, { headers: { 'Content-Type': 'application/json' } })
	.success(function(notificacoes){
		$scope.notificacoes = notificacoes.data;
		$scope.tipo = notificacoes.data.tipo;

		if($scope.tipo == 1){
			$scope.notificacoesTipo = 'Pesquisa';
		} else {
			$scope.notificacoesTipo = 'Campanha';
		}

		console.log(notificacoes);
	}).error(function(erro){
		console.log(erro);
		$scope.mensagem = notificacoes.msg.msg;
	});



	//Função responsável por enviar o objeto de onde foi clicado para o service "compartilhaObj" e depois realizar verificação do tipo de notificação e fazer o redirecionamento
	$scope.getClick = function(data){
		compartilharObj.set(data); //Passa o data para o service
		if(data.tipo == 1){
			$state.go('tabs.pesquisa');
		} else if(data.tipo == 2) {
			$state.go('tabs.campanha');
		}
	}

	$scope.descartarNotificacao = function(data){
		if(data.tipo == 1){
			$scope.id_pesquisa = data.id_notificacao;
			var urlDescartarPesquisa = "https://ws-login.gpdtecnologia.com.br/Survey/discard/" + $scope.id_usuario;
			var dataPesquisa = {
				"h" : "jdlk2m1m28md92290",
				"id_app":  "5880935fd4779ee0d202190e",
				"data": {
					"data_hora": 1470904205,
					"id_pesquisa": $scope.id_pesquisa
				}
			};

			$http.put(urlDescartarPesquisa, dataPesquisa, { headers: { 'Content-Type': 'application/json' } })
			.success(function(response){
				console.log(response);
			})
			.error(function(error){
				console.log(error);
			});

		} else if(data.tipo == 2){
			$scope.id_campanha = data.id_notificacao;
			var urlDescartarCampanha = "https://ws-login.gpdtecnologia.com.br/Notification/discard/" + $scope.id_usuario;
			var dataCampanha = {
				"h" : "jdlk2m1m28md92290",
				"id_app":  "5880935fd4779ee0d202190e",
				"data": {
					"data_hora": 1470904205,
					"id_campanha": $scope.id_campanha
				}
			};

			$http.put(urlDescartarCampanha, dataCampanha, { headers: { 'Content-Type': 'application/json' } })
			.success(function(response){
				console.log(response);
			})
			.error(function(error){
				console.log(error);
			});
		}
	}

});
