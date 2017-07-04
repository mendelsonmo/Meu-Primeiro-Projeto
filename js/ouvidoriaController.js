angular.module('starter').controller('OuvidoriaController', function($scope,$state,$rootScope,$http,$ionicPopup, $cordovaImagePicker, $ionicLoading, $cordovaCamera,$ionicPlatform){
	$scope.mensagem = '';
	$scope.adicOuvidoria = new Object();
	
	var url = 'https://ws-sac.gpdtecnologia.com.br';
	$scope.nome_usuario = window.localStorage.getItem('nome_usuario');
	$scope.foto_usuario = window.localStorage.getItem('foto_usuario');
	$scope.cidade_usuario = window.localStorage.getItem('cidade_usuario');
	$scope.db = window.localStorage.getItem('db');
$scope.id_usuario = window.localStorage.getItem('id_usuario');

	var cartao_cidadao = "100.333.827.927.230";
	var id_app= "5880935fd4779ee0d202190e";
	var id_usuario = "58c982ab1d41c81e060da378";
	var chave_app = "9VAeeySkbw5VxRfdcbwhdsnmUgFtwtB7Ng5Zv8GC6JaNgaGtB7rKLZurUwMs9epvHC2xAWv8CLaRRwAJD7b4e4PahjnjjXByvGbfEuWkfJbeuWzcM3hu5Pew52fkjqSa";
		
	var cartao_cidadao = "100.333.827.927.230";
	var id_app= "5880935fd4779ee0d202190e";
	var id_usuario = "58c982ab1d41c81e060da378";
	var chave_app = "9VAeeySkbw5VxRfdcbwhdsnmUgFtwtB7Ng5Zv8GC6JaNgaGtB7rKLZurUwMs9epvHC2xAWv8CLaRRwAJD7b4e4PahjnjjXByvGbfEuWkfJbeuWzcM3hu5Pew52fkjqSa";
		
	//console.log($scope.id_usuario);
	//fortitude
	//$scope.servicos = [];
	$http.get(url+'/Info/subjects/1/' + $scope.db + '/'+$scope.id_usuario +'?id_app=5880935fd4779ee0d202190e&tipo=2', { headers: { 'Content-Type': 'application/json' } })
	.success(function(servicos){
		$scope.servicos = servicos.data;
		console.log(servicos);
		//$scope.listar = listar.data;		
	})	
	.error(function(error){
		console.log(error);
	})
	
	$scope.obterLocalizacao = function(){
		
		if (navigator.geolocation) {
			$scope.adicOuvidoria.posicacao = navigator.geolocation.getCurrentPosition(showPosition);
		} else {
			x.innerHTML = "Geolocation is not supported by this browser.";
		}
		
		function showPosition(position) {				
			$scope.adicOuvidoria.lat = position.coords.latitude;
			$scope.adicOuvidoria.longi = position.coords.longitude;
			console.log(position);
			//$state.go('obterLocalizacao');				
			
			$http.get('https://maps.google.com/maps/api/geocode/json?address='+$scope.adicOuvidoria.lat+','+$scope.adicOuvidoria.longi, 
				{ headers: { 'Content-Type': 'application/json' } })
			.success(function(data){
				$scope.adicOuvidoria.numero = data.results[0].address_components[0].long_name;
				$scope.adicOuvidoria.rua    = data.results[0].address_components[1].long_name;
				$scope.adicOuvidoria.bairro = data.results[0].address_components[2].long_name;
				$scope.adicOuvidoria.cidade = data.results[0].address_components[3].long_name;
				$scope.adicOuvidoria.estado = data.results[0].address_components[5].short_name;
				$scope.adicOuvidoria.cep    = data.results[0].address_components[7].long_name;
				console.log($scope.adicOuvidoria.numero,$scope.adicOuvidoria.rua,$scope.adicOuvidoria.bairro);
				
			$scope.endereco = $scope.adicOuvidoria.numero+" "+$scope.adicOuvidoria.rua+" - "+$scope.adicOuvidoria.bairro;
				document.getElementById("ende").focus();
			
			$rootScope.numero =  $scope.adicOuvidoria.numero;
			$rootScope.rua    =  $scope.adicOuvidoria.rua;
			$rootScope.bairro =  $scope.adicOuvidoria.bairro;
			$rootScope.cidade =  $scope.adicOuvidoria.cidade;			
			$rootScope.latitude = $scope.adicOuvidoria.lat;
			$rootScope.longitude = $scope.adicOuvidoria.longi;
			$state.go('tabs.obterLocalizacao');
			
		})			
			
			.error(function(error){
				console.log(error);
				
			});
			
		}	
		
	}


// INICIO  GALERIA FOTOS ===================================================
	
	$scope.GalleriPictureOuvidoria = function(){	
	//	alert("galeria");
		var options = {
				        maximumImagesCount: 3,
				  	    width: 80,
				    	height: 60,
				        quality: 80
				};
		   
				    $cordovaImagePicker.getPictures(options).then(function(results) {
				    	$scope.image = [];
				    	//alert(results);
				    	//$scope.image = new Array();
				
				      	for (var i = 0; i < results.length; i++) {
				      		$scope.image.push(results[i]);
				      		$scope.adicOuvidoria.image = $scope.image;
				      		//$scope.collection.selectedImage = results[i];
				      //	$scope.imageSelecionada = "data:image/jpeg;base64,"+$scope.image;				      
				      	//	alert($scope.image);                     	             
                        	      	
				      
				    }
				     
				    }, function(err) {
				      alert("errors"+err);
				     // console.log(err);
				    });
				    
				 
	}


//FIM GALERIAS =============================================================


// FOTO INICIO  ===================================================
	
	$scope.takePictureOuvidoria = function(){	
			
		var options = {
				      quality: 50,
				      destinationType: Camera.DestinationType.DATA_URL,
				      sourceType: Camera.PictureSourceType.CAMERA,
				      allowEdit: true,
				      encodingType: Camera.EncodingType.JPEG,
				      targetWidth: 100,
				      targetHeight: 100,
				      popoverOptions: CameraPopoverOptions,
				      saveToPhotoAlbum: false,
					  correctOrientation:true
				    };

				  
				    $cordovaCamera.getPicture(options).then(function(imageData) {
						$scope.imageTake = [];		 
				      //var image = document.getElementById('myImage');
				      // for (var i = 0; i < 1; i++) {
				      	$scope.imageTake.push("data:image/jpeg;base64,"+$scope.imageData);				      
				      	// alert($scope.image);    
				     $rootScope.image = $scope.image;
				  // }
				   
				    }, function(err) {
				      alert("errors");
				      console.log(err);
				    });
				    
				 
	}
	
//FIM FOTO=============================================================

    function showError(error) {
    	switch(error.code) {
    		case error.PERMISSION_DENIED:
    		x.innerHTML = "User denied the request for Geolocation."
    		break;
    		case error.POSITION_UNAVAILABLE:
    		x.innerHTML = "Location information is unavailable."
    		break;
    		case error.TIMEOUT:
    		x.innerHTML = "The request to get user location timed out."
    		break;
    		case error.UNKNOWN_ERROR:
    		x.innerHTML = "An unknown error occurred."
    		break;
    	}
    }

	$scope.cancelar = function(){
		$state.go('tabs.home');
	};

	$scope.enviar = function(ouvidoria){
		console.log(ouvidoria);
		
		$rootScope.ouvidoria = ouvidoria;
	
		var enviarOuvidoria = {	
				"id_app":  "5880935fd4779ee0d202190e",
				"h" : "jdlk2m1m28md92290",			
			"data":{	
					"data_hora" : 1470904205,				
					"id_usuario" : $scope.id_usuario,
					"id_servico" : "5810fd44a2f5725be8ac3bcf",
					"publicacao" : $scope.add.segPichacao,
					"localizacao" : {
								"logradouro" : $rootScope.rua,
								"numero" : $rootScope.numero,
								"bairro" : $rootScope.bairro,
								"cidade" :$rootScope.cidade,
								"latitude" : $rootScope.latitude,
								"longitude" :$rootScope.longitude
									},
					"anexos" : [
							"ZG1sYXNtZG13bXEyOWFtZGFzbGRh" ,
							"YWJqamFka2RtZGUsICB3bGRzYWssZGxzYWQgbHcg" ,
							"YnZkZmRzIGZkZHF3IGFzZGFzIGFzZGFz"
							]							
									
								}	
		}
					console.log(enviarOuvidoria);

			$http.post(url+'/UserActions/request/1/'+$scope.db,enviarOuvidoria,{ headers: { 'Content-Type': 'application/json' } })
			.success(function(result){
					$scope.result =  result.msg.msg;
					 $scope.showAlert = function() {
					   var alertPopup = $ionicPopup.alert({
						 title: 'Atenção',
						 template:$scope.result
					   });
					   alertPopup.then(function(res) {
						 console.log('Obrigado');
					   });
					 };
			$scope.showAlert();
					//console.log(result);
				})
			.error(function(error){
				console.log(error);
			});								
		}		
		

	
})