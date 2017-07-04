angular.module('starter').controller('HomeController', function($scope, $state, $http, compartilharObj){
	
	var url = 'https://ws-sac.gpdtecnologia.com.br/';

	//Recupera a chave e o id do usuario do localStorage
	$scope.hash = window.localStorage.getItem('HashUsuario');
	$scope.id_usuario = window.localStorage.getItem('id_usuario');
	$scope.cartao_cidadao = window.localStorage.getItem('cartao_cidadao');
	$scope.db = window.localStorage.getItem('db');
	$scope.nome_usuario = window.localStorage.getItem('nome_usuario');
	$scope.foto_usuario = window.localStorage.getItem('foto_usuario');
	$scope.cidade_usuario = window.localStorage.getItem('cidade_usuario');
	
	//Realiza a montagem da url de acordo com os parámentros e realiza a listagem das notificações

	var urlListar = "https://ws-sac.gpdtecnologia.com.br/Info/requests/1/" + $scope.db + "/"+ $scope.id_usuario +"?id_app=5880935fd4779ee0d202190e&cartao_cidadao=" + $scope.cartao_cidadao; 
	$scope.protocolosIniciais = [];
	$http.get(urlListar, { headers: { 'Content-Type': 'application/json' } })
	.success(function(protocolosIniciais){
		$scope.protocolosIniciais = protocolosIniciais.data;
		//console.log(protocolosIniciais);
		
	}).error(function(error){
		console.log(error);
	});
	

	$scope.hash = window.localStorage.getItem('HashUsuario');
	$scope.id_usuario = window.localStorage.getItem('id_usuario');

	var urlBasciData = "https://ws-login.gpdtecnologia.com.br/Account/basicDataUser/" + $scope.hash + '/' + $scope.id_usuario + "?id_app=5880935fd4779ee0d202190e";

	$scope.dadosUsuario = {};
	$http.get(urlBasciData, { headers: { 'Content-Type': 'application/json' } })
	.success(function(result){
		$scope.dadosUsuario = result.data;

		$scope.db = result.data.municipio.db;
		window.localStorage.setItem('db', $scope.db);
		
		$scope.cartao_cidadao = result.data.cartao_cidadao;
		window.localStorage.setItem('cartao_cidadao', $scope.cartao_cidadao);

		$scope.nome_usuario = result.data.nome;
		window.localStorage.setItem('nome_usuario', $scope.nome_usuario);

		$scope.foto_usuario = result.data.foto;
		window.localStorage.setItem('foto_usuario', $scope.foto_usuario);

		$scope.cidade_usuario = result.data.municipio.nome;
		window.localStorage.setItem('cidade_usuario', $scope.cidade_usuario);
		
	})
	.error(function(error){
		console.log(error);
	});
	

	//responsável pelo botão de like
	$scope.acompanhar = function(data){

		var respAcompanhar = {
			"id_app":  "5880935fd4779ee0d202190e",
			"data": {
				"data_hora": 1470904205,
				"id_usuario": $scope.id_usuario
			}
		};

		console.log(data);

		$http.put(url + 'UserActions/follow/' + $scope.db + '/' + data.id_protocolo, respAcompanhar)
		.success(function(response){
			console.log(response);
		}).error(function(error){
			console.log(error);
		});

	};

	$scope.denunciar = function(){
		$state.go('tabs.denunciar');
	};

	$scope.ouvidoria = function(){
		$state.go('tabs.ouvidoria');
	};
	
	
	$scope.detalhesProtocolo = function(data){
		compartilharObj.set(data);
		$state.go('tabs.detalhes');	
	};

});