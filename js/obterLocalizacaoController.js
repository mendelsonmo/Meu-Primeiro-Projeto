angular.module('starter').controller('ObterLocalizacaoController', function($scope, $state,$rootScope){
	 $scope.add = new Object();
	
	$rootScope.numero;
	$rootScope.rua;
	$rootScope.bairro;
	$rootScope.cidade;
	$scope.enderecolocal =  $rootScope.numero+" "+$rootScope.rua+" - "+$rootScope.bairro;
	document.getElementById("endLocal").focus();
	 function initMap() {
        var myLatLng = {lat:$rootScope.latitude, lng:$rootScope.longitude};

        // Create a map object and specify the DOM element for display.
        var map = new google.maps.Map(document.getElementById('map'), {
          center: myLatLng,
          scrollwheel: false,
          zoom: 16
        });

        // Create a marker and set its position.
        var marker = new google.maps.Marker({
          map: map,
          position: myLatLng,
          title: 'Hello!'
        });
		
      }
	  
	  initMap();
	  
	
	$scope.usarLocalizacao = function(){
		
    $rootScope.numero;
	$rootScope.rua;
	$rootScope.bairro;
	$rootScope.cidade;
	$scope.endereco =  $rootScope.numero+" "+$rootScope.rua+" - "+$rootScope.bairro;
	document.getElementById("endLocal").focus();
   $state.go('tabs.denunciar');
	}
	
	
	
});