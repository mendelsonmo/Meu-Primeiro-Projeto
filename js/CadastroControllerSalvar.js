angular.module('starter')
.controller('CadastroControllerSalvar', function($scope,$http,$state,$rootScope,$ionicPopup){
	$scope.mensagem = '';
	var url = 'https://ws-login.gpdtecnologia.com.br';
	$scope.add = new Object();
	//console.log($rootScope.add);
	$scope.salvar = function(dados){
		$rootScope.dados = dados;
		var chave_app = "9VAeeySkbw5VxRfdcbwhdsnmUgFtwtB7Ng5Zv8GC6JaNgaGtB7rKLZurUwMs9epvHC2xAWv8CLaRRwAJD7b4e4PahjnjjXByvGbfEuWkfJbeuWzcM3hu5Pew52fkjqSa";
		var foto = "QWVuZWFuIHBsYWNlcmF0LiBJbiB2dWxwdXRhdGUgdXJuYSBldSBhcmN1LiA=";		
		var dataSend = {
			"h" : "jdlk2m1m28md92290",
			"data": 
			{	
				"h": 1,			
				"tipo": 1,
				"data_hora": 1470904205,				
				"email": $rootScope.add.email,
				"senha":  $rootScope.add.senha,
				"facebook":[],
				"googleplus":[],		
				"id_municipio": $rootScope.add.municipio,						
				"cartao_cidadao": $rootScope.dados.cartaoCidadao,
				"sexo":  $rootScope.dados.sexo,
				"nome": $rootScope.add.nome,
				"foto": "QWVuZWFuIHBsYWNlcmF0LiBJbiB2dWxwdXRhdGUgdXJuYSBldSBhcmN1LiA=",
				"data_nasc": $rootScope.dados.dataNascimento,
				"nome_mae": $rootScope.dados.mae,
				"celular": $rootScope.dados.celular,				
				"chave_app": chave_app
				},
			"id_app":  "5880935fd4779ee0d202190e"
		}	
		//console.log(dataSend);
		$http.post(url+'/Account/registerAccount', dataSend, { headers: { 'Content-Type': 'application/json' } })
        .success(function(result){
		$scope.result =  result.msg.msg;	
			 $scope.showAlert = function() {
			   var alertPopup = $ionicPopup.alert({
				 title: 'Atenção',
				 template:$scope.result.message.msg
			   });
			   alertPopup.then(function(res) {
				 console.log('Obrigado');
			   });
			 };
			$scope.showAlert();
		//$state.go('tabs.home');
        })
        .error(function(erro){
			$scope.erro = erro.message.cod;
			if($scope.erro = 1012){
						// An alert dialog
			 $scope.showAlert = function() {
			   var alertPopup = $ionicPopup.alert({
				 title: 'Atenção !',
				 template: erro.message.msg
			   });

			   alertPopup.then(function(res) {
				 console.log('Obrigado');
			   });
			 };		
				
			}if($scope.erro = 1013){
						// An alert dialog
				 $scope.showAlert = function() {
				   var alertPopup = $ionicPopup.alert({
					 title: 'Atenção !',
					 template: erro.message.msg
				   });

				   alertPopup.then(function(res) {
					 console.log('Obrigado');
				   });
				 };			
				
			}
			if($scope.erro = 1014){
						// An alert dialog
				 $scope.showAlert = function() {
				   var alertPopup = $ionicPopup.alert({
					 title: 'Atenção !',
					 template: erro.message.msg
				   });

				   alertPopup.then(function(res) {
					 console.log('Obrigado');
				   });
				 };			
				
			}
			if($scope.erro = 1015){
						// An alert dialog
				 $scope.showAlert = function() {
				   var alertPopup = $ionicPopup.alert({
					 title: 'Atenção !',
					 template: erro.message.msg
				   });

				   alertPopup.then(function(res) {
					 console.log('Obrigado');
				   });
				 };			
				
			} 
			if($scope.erro = 1016){
						// An alert dialog
				 $scope.showAlert = function() {
				   var alertPopup = $ionicPopup.alert({
					 title: 'Atenção !',
					 template: erro.message.msg
				   });

				   alertPopup.then(function(res) {
					 console.log('Obrigado');
				   });
				 };			
				
			} 

           $scope.showAlert();
           // console.log(erro);
        });					
	}

});