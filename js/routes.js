angular.module('starter').config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider){

	$stateProvider
	.state('login', {
		url: '/login',
		templateUrl: 'templates/login.html',
		controller: 'LoginController'
	})
	.state('cadastroUm', {
		url: '/cadastroUm',
		templateUrl: 'templates/cadastro-um.html',
		controller: 'CadastroController'
	})
	.state('cadastroDois', {
		url: '/cadastroDois',
		templateUrl: 'templates/cadastro-dois.html',
		controller: 'CadastroControllerSalvar'
		
	})
	.state('tabs', {
		url: '/tabs',
		abstract: true,
		templateUrl: 'templates/tabs.html'
	})
	.state('tabs.home', {
		url: '/home',
		views: {
			'home-tab' : {
				templateUrl: 'templates/home.html',
				controller: 'HomeController'
			}
		}
	})
	.state('tabs.detalhes',{
		url: '/detalhes',
		views:{
			'home-tab': {
				templateUrl: 'templates/detalhes.html',
				controller:   'DetalhesController'	
			}
		}		
	})
	.state('tabs.verMais',{
		url: '/verMais',
		views:{
			'home-tab': {
				templateUrl: 'templates/ver-mais.html',
				controller:   'DetalhesController'	
			}
		}		
	})
	.state('tabs.denunciar', {
		url: '/denunciar',
		views: {
			'home-tab': {
				templateUrl: 'templates/denunciar.html',
				controller: 'DenunciarController'
			}
		}			
	})
	.state('tabs.ouvidoria', {
		url: '/ouvidoria',
		views: {
			'home-tab': {
				templateUrl: 'templates/ouvidoria.html',
				controller: 'OuvidoriaController'
			}
		}
	})
	.state('tabs.obterLocalizacao', {
		url: '/obterLocalizacao',
		views: {
			'home-tab': {
				templateUrl: 'templates/obterLocalizacao.html',
				controller: 'ObterLocalizacaoController'
			}
		}
	})
	.state('tabs.notificacoes', {
		url: '/notificacoes',
		views: {
			'notificacoes-tab' : {
				templateUrl: 'templates/notificacoes.html',
				controller: 'NotificacoesController'
			}
		}
	})
	.state('tabs.campanha', {
		url: '/campanha',
		views: {
			'notificacoes-tab': {
				templateUrl: 'templates/campanha.html',
				controller: 'CampanhaController'
			}
		}
	})
	.state('tabs.pesquisa', {
		url: '/pesquisa',
		views: {
			'notificacoes-tab': {
				templateUrl: 'templates/pesquisa.html',
				controller: 'PesquisaController'
			}
		}
	})
	.state('tabs.iniciaPesquisa', {
		url: '/iniciaPesquisa',
		views: {
			'notificacoes-tab': {
				templateUrl: 'templates/inicia-pesquisa.html',
				controller: 'IniciaPesquisaController'
			}
		}
	})
	.state('tabs.ajustes', {
		url: '/ajustes',
		views: {
			'ajustes-tab' : {
				templateUrl: 'templates/ajustes.html',
				controller: 'AjustesController'
			}
		}
	})
	.state('tabs.acompanhe', {
		url: '/acompanhe',
		views: {
			'acompanhe-tab': {
				templateUrl: 'templates/acompanhe.html',
				controller: 'AcompanheController'
			}
		}
	})
	.state('tabs.filtros', {
		url: '/filtros',
		views: {
			'acompanhe-tab': {
				templateUrl: 'templates/filtros.html',
				controller: 'FiltroController'
			}
		}
	})
	.state('tabs.perfil', {
		url: '/perfil',
		views: {
			'ajustes-tab': {
				templateUrl: 'templates/perfil.html',
				controller: 'PerfilController'
			}
		}
	});

	$urlRouterProvider.otherwise('login');
	$ionicConfigProvider.tabs.position('bottom');
});


