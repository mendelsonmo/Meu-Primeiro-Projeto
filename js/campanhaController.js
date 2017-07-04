angular.module('starter').controller('CampanhaController', function($scope, $state, $http, $sce,compartilharObj){
	
	// //Recebe os dados de acordo com a notificação clicada
	// $scope.dados = compartilharObj.get();

	// //Responsável por enviar a mensagem de erro, caso receba alguma
	// $scope.mensagem = '';

	// //Recupera os ids para poder ser utilizados na url
	// $scope.id_notificacao = $scope.dados.id_notificacao;
	// $scope.id_usuario = window.localStorage.getItem('id_usuario');
	// $scope.hash = window.localStorage.getItem('HashUsuario');
	$scope.nome_usuario = window.localStorage.getItem('nome_usuario');
	$scope.foto_usuario = window.localStorage.getItem('foto_usuario');
	$scope.cidade_usuario = window.localStorage.getItem('cidade_usuario');
	
	// //Função responsável pela listagem dos detalhes da campanha de acordo com o id recebido através do service "compartilharObj"
	// var url = "https://ws-login.gpdtecnologia.com.br/Notification/details/" + $scope.hash + "/" + $scope.id_usuario + "?id_campanha=" + $scope.id_notificacao + "&id_app=5880935fd4779ee0d202190e";
	// $http.get(url, { headers: { 'Content-Type': 'application/json' } })
	// .success(function(campanhas){
	// 	$scope.campanhas = campanhas.data;
	// 	$scope.campanhasHtml = campanhas.data.conteudo;
	// 	$scope.campanhasHtml = $sce.trustAsHtml($scope.campanhasHtml);
	// })
	// .error(function(erro){
	// 	console.log(erro);
	// });

	// //Função responsável por descartar a campanha
	// var urlDescartar = "https://ws-login.gpdtecnologia.com.br/Notification/discard/" + $scope.id_usuario;
	// $scope.descartarCampanha = function(){
	// 	var dataSend = {
	// 		"h" : "jdlk2m1m28md92290",
	// 		"id_app":  "5880935fd4779ee0d202190e",
	// 		"data": {
	// 			"data_hora": 1470904205,
	// 			"id_campanha": $scope.id_notificacao
	// 		}
	// 	};

	// 	$http.put(urlDescartar, dataSend, { headers: { 'Content-Type': 'application/json' } })
	// 	.success(function(response){
	// 		$scope.success = response.success;
	// 		if($scope.success == 1){
	// 			$state.go('tabs.notificacoes');
	// 		} else {
	// 			$scope.mensagem = 'Erro ao descartar a campanha';
	// 		}
	// 	})
	// 	.error(function(error){
	// 		console.log(error);
	// 	});
	// };

	// //Função responsável pelo botão de voltar
	// $scope.voltar = function(){
	// 	$state.go('tabs.notificacoes');
	// };
})
.directive('ionicstringtohtml', ['$compile', function($compile) {
	//Diretiva responsável por transformar o dado recebido em html da api em um html utilizável
	return function(scope, element, attrs) {
		scope.$watch(
			function(scope) {
				return scope.$eval(attrs.inputstring);
			},
			function(value) {
				element.html(value);
				$compile(element.contents())(scope);
			}
			);
	};
}]);