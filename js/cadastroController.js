angular.module('starter')
.controller('CadastroController', function($scope, $state,$http,compartilharObj,$rootScope){
	$scope.add = new Object();
	
	$scope.add = new Object();
	var url = 'https://ws-login.gpdtecnologia.com.br';    
	var cartao_cidadao = "100.333.827.927.230";
	var id_app= "5880935fd4779ee0d202190e";
	var chave_app = "9VAeeySkbw5VxRfdcbwhdsnmUgFtwtB7Ng5Zv8GC6JaNgaGtB7rKLZurUwMs9epvHC2xAWv8CLaRRwAJD7b4e4PahjnjjXByvGbfEuWkfJbeuWzcM3hu5Pew52fkjqSa";
		
		
		$scope.listas = [];
	$http.get(url+'/Info/listCities/'+chave_app+'/'+ cartao_cidadao + "?id_app=5880935fd4779ee0d202190e", { headers: { 'Content-Type': 'application/json' } })
	.success(function(cidades){
		$scope.cidades = cidades.data;		
		//console.log($scope.cidades);			
	})	
	
	$scope.voltar = function(){
		$state.go('login');
	}

	$scope.voltarDois = function(){
		$state.go('cadastroUm');
			
	}

	$scope.proximo = function(add){	
	
		$rootScope.add = add;	
		//compartilharObj.set(add);		
	    $state.go('cadastroDois');
		//console.log(add);
	}
	
	
		
	
});


