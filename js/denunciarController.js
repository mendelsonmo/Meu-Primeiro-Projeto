angular.module('starter').controller('DenunciarController',function($scope,$state,$rootScope,$http,$ionicPopup, $cordovaImagePicker, $ionicLoading, $cordovaCamera,$ionicPlatform){
	$scope.add = new Object();
	
	

	var url = 'https://ws-sac.gpdtecnologia.com.br';
	//Recupera a chave e o id do usuario do localstorage
	$scope.hash = window.localStorage.getItem('HashUsuario');
	$scope.id_usuario = window.localStorage.getItem('id_usuario');
	$scope.nome_usuario = window.localStorage.getItem('nome_usuario');
	$scope.foto_usuario = window.localStorage.getItem('foto_usuario');
	$scope.cidade_usuario = window.localStorage.getItem('cidade_usuario');
	$scope.db = window.localStorage.getItem('db');

	$rootScope.foto = window.localStorage.getItem('foto_usuario');

	
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
	
	$scope.cancelar = function(){
		$state.go('tabs.home');
	}
	$scope.enviar = function(){
		$state.go('tabs.home');
	}



// INICIO  GALERIA FOTOS ===================================================
	
	$scope.GalleriPicture = function(){	
		
		var options = {
				        maximumImagesCount: 4,
				  	    width: 50,
				    	height: 50,
				        quality: 80
				};
		   
				    $cordovaImagePicker.getPictures(options).then(function(results) {
				    	$scope.image = [];
				    	//alert(results);
				    	//$scope.image = new Array();
				
				      	for (var i = 0; i < results.length; i++) {
				      		$scope.image.push(results[i]);
				      		 $rootScope.image = $scope.image;
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
	
	$scope.takePicture = function(){	
		alert("teste");	
		var options = {
				      quality: 50,
				      destinationType: Camera.DestinationType.DATA_URL,
				      sourceType: Camera.PictureSourceType.CAMERA,
				      allowEdit: true,
				      encodingType: Camera.EncodingType.JPEG,
				      targetWidth: 50,
				      targetHeight: 50,
				      popoverOptions: CameraPopoverOptions,
				      saveToPhotoAlbum: false,
					  correctOrientation:true
				    };

				   
				    $cordovaCamera.getPicture(options).then(function(imageData) {
				    	//$scope.image = new Array();
				      //var image = document.getElementById('myImage');
				      	//for (var i = 0; i < $scope.image.length; i++) {
				      	$scope.image.push("data:image/jpeg;base64,"+imageData);				      
				      	alert($scope.image);	
						// $scope.add.image = $scope.image;  	     
				    //}
					
				     
				    }, function(err) {
				      alert("errors");
				      console.log(err);
				    });
				    
				 
	}


//FIM FOTO=============================================================

	$scope.obterLocal = function(){		
		alert("obterLocal");
		if (navigator.geolocation) {
			$scope.add.posicacao = navigator.geolocation.getCurrentPosition(showPosition);
		} else {
			x.innerHTML = "Geolocation is not supported by this browser.";
			//alert("Ativar localizacao");
		}
		
		
		function showPosition(position) {				
			$scope.add.lat = position.coords.latitude;
			$scope.add.longi = position.coords.longitude;
			alert(position.coords.latitude+","+position.coords.longitude);
			//$state.go('obterLocalizacao');				
			
			$http.get('https://maps.google.com/maps/api/geocode/json?address='+$scope.add.lat+','+$scope.add.longi, 
				{ headers: { 'Content-Type': 'application/json' } })
			.success(function(data){
				$scope.add.numero = data.results[0].address_components[0].long_name;
				$scope.add.rua    = data.results[0].address_components[1].long_name;
				$scope.add.bairro = data.results[0].address_components[2].long_name;
				$scope.add.cidade = data.results[0].address_components[3].long_name;
				$scope.add.estado = data.results[0].address_components[5].short_name;
				$scope.add.cep    = data.results[0].address_components[7].long_name;
				console.log($scope.add.numero,$scope.add.rua,$scope.add.bairro);
				
			
			$rootScope.numero =  $scope.add.numero;
			$rootScope.rua    =  $scope.add.rua;
			$rootScope.bairro =  $scope.add.bairro;
			$rootScope.cidade =  $scope.add.cidade;			
			$rootScope.latitude = $scope.add.lat;
			$rootScope.longitude = $scope.add.longi;

			$rootScope.endereco = $rootScope.numero+" "+$rootScope.rua+" - "+$rootScope.bairro ;
				document.getElementById("endLocal").focus();
			
			$state.go('tabs.obterLocalizacao');
			
		})			
			
			.error(function(error){
				console.log(error);
				
			});
			
		}	
		
	}

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
    
    $scope.enviar = function(dadosDenucia){	
		alert("enviar");
		$rootScope.dadosDenucia = dadosDenucia;
	
		var enviarDenuncia = {	
				"id_app":  "5880935fd4779ee0d202190e",
				"h" : "jdlk2m1m28md92290",			
			"data":{	
					"data_hora" : 1470904205,				
					"id_usuario" : "588a294c1d41c80ddc4465a2",
					"id_servico" : "5810fd44a2f5725be8ac3bcf",
					"publicacao" : "Olha a situação que encontrei o deck do parque." ,
					"localizacao" : {
								"logradouro" : "Rua Augusto César",
								"numero" : "101",
								"bairro" : "General Osorio",
								"cidade" : "Uberlândia",
								"latitude" : -18.9256098,
								"longitude" : -48.2813437
									},
					"anexos" : [
							"ZG1sYXNtZG13bXEyOWFtZGFzbGRh" ,
							"YWJqamFka2RtZGUsICB3bGRzYWssZGxzYWQgbHcg" ,
							"YnZkZmRzIGZkZHF3IGFzZGFzIGFzZGFz"
							]							
									
								}	
		}
		console.log(enviarDenuncia);		
			alert(enviarDenuncia);		
		$http.post(url+'/UserActions/request/1/'+$scope.db,enviarDenuncia,{ headers: { 'Content-Type': 'application/json' } })
			.success(function(result){
					$scope.result =  result.msg.msg;
					 $scope.showAlert = function() {
					   var alertPopup = $ionicPopup.alert({
						 title: 'Atenção',
						 template:$scope.result
					   });
					   alertPopup.then(function(res) {
						 alert('Obrigado');
					   });
					 };
			$scope.showAlert();
					//console.log(result);
				})
			.error(function(error){
				alert(error);
			});
	}
});