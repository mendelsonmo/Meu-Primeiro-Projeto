//Compartilhar objeto
angular.module('starter').service('compartilharObj',function(){
	var dados = {};

	return {

		get : function (){
			return dados;
		},
		set : function (data){
			dados = data;
		}

	}

});