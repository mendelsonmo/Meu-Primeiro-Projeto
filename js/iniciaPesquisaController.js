angular.module('starter').controller('IniciaPesquisaController', function($scope, $state, $http, $ionicPopup, compartilharObj){
	//Recebe os dados da notificação que foi clicada através do service cinoartilharObj
	$scope.dados = compartilharObj.get();

	//Responsável por enviar a mensagem de erro, caso receba alguma
	$scope.mensagem = '';

	//Recupera os ids para poder ser utilizados na url
	$scope.id_notificacao = $scope.dados.id_notificacao;
	$scope.id_usuario = window.localStorage.getItem('id_usuario');
	$scope.hash = window.localStorage.getItem('HashUsuario');
	$scope.nome_usuario = window.localStorage.getItem('nome_usuario');
	$scope.foto_usuario = window.localStorage.getItem('foto_usuario');
	$scope.cidade_usuario = window.localStorage.getItem('cidade_usuario');

	//Listagem dos detalhes da pesquisa de acordo do id recebido pelo compartilharObj
	var urlPerguntas = "https://ws-login.gpdtecnologia.com.br/Survey/details/" + $scope.hash + "/" + $scope.id_usuario + "?id_pesquisa=" + $scope.id_notificacao + "&id_app=5880935fd4779ee0d202190e";
	$scope.perguntas = [];
	$http.get(urlPerguntas, { headers: { 'Content-Type': 'application/json' } })
	.success(function(pesquisa){
		$scope.pesquisa = pesquisa.data;
		$scope.perguntas = pesquisa.data.perguntas;
		console.log(pesquisa);
	})
	.error(function(erro){
		console.log(erro);
	});

	//Responsável por pegar os ids das perguntas e respostas
	$scope.respostas = [];
	$scope.getColecao = function(perguntaData = null, pergunta = null){
		
		$scope.id_opcao = perguntaData.id_opcao;
		$scope.id_pergunta = pergunta.id_pergunta;
		$scope.respostas.push(
		{
			id_pergunta: $scope.id_pergunta,
			id_opcao: $scope.id_opcao
		}
		);
		
	};

	//responsável por responder a pesquisa
	$scope.form = {};
	$scope.respondePesquisa = function(){
		var dataResposta = {
			"h" : "jdlk2m1m28md92290",
			"id_app":  "5880935fd4779ee0d202190e",
			"data": {
				"id_usuario": $scope.id_usuario,
				"id_pesquisa": $scope.id_notificacao,
				"data_hora":  "2016-06-20 08:20:23",
				"respostas": $scope.respostas
			}
		};


		var urlResponde = "https://ws-login.gpdtecnologia.com.br/Survey/answers";
		$http.post(urlResponde, dataResposta, { headers: { 'Content-Type': 'application/json' } })
		.success(function(response){
			$scope.success = response.success;
			if($scope.success == 1){
				var alertPopup = $ionicPopup.alert({
					title: 'Pesquisa finalizada foi finalizada com sucesso!',
					template: 'Muito obrigado!'
				});

				alertPopup.then(function(res) {
					console.log('Obrigado por responder a pesquisa');
					$state.go('tabs.notificacoes');
				});
			} else if($scope.success == 0) {
				var alertPopup = $ionicPopup.alert({
					title: 'Erro ao responder a pesquisa!',
					template: 'Lamentamos que um erro inesperado tenha acontecido, por favor, nos contate o mais rápido possível. Agradecemos.'
				});

				alertPopup.then(function(res) {
					console.log('Um erro ocorreu ao finalizar a pesquisa.');
					$state.go('tabs.ajustes');
				});
			}
			console.log(response);
		})
		.error(function(error){
			console.log(error);
		});
		
	};

	//Paginação
	$scope.curPage = 0;
	$scope.pageSize = 1;

	$scope.numberOfPages = function() {
		return Math.ceil($scope.perguntas.length / $scope.pageSize);
	};

	//Botão com opção de voltar para a tela de notificações
	$scope.voltar = function(){
		$state.go('tabs.notificacoes');
	};
	
	//Deixa selecionar apenas 1 checkbox
	$scope.updateSelection = function(position, teste) {
		angular.forEach(teste, function(perguntaData, index) {
			if (position != index) 
				perguntaData.checked = false;
		});
	};

});