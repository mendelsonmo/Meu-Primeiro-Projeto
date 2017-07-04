angular.module('starter')
.controller('LoginController', function($scope, $state, $ionicPopup, $timeout, $http, md5, $filter){

    var url = 'https://ws-login.gpdtecnologia.com.br';

    $scope.login = {};

    //responsável por fazer a encriptação da senha antes de enviar para a api
    $scope.$watch('login.password', function(){
        $scope.senha = md5.createHash($scope.login.password || '');
    });

    /* responsável por fazer o login convencional, a variável dataSend é a responsável por conter
    as informações a serem enviadas no json */
    $scope.signIn = function(login){
        var dataSend = {
            "h" : "jdlk2m1m28md92290",
            "id_app":  "5880935fd4779ee0d202190e",
            "data": {
                "data_hora": 1470904205,
                "tipo": 1,
                "login": $scope.login.user,
                "senha": $scope.senha,
                "h": 1,
                "chave_app": "9VAeeySkbw5VxRfdcbwhdsnmUgFtwtB7Ng5Zv8GC6JaNgaGtB7rKLZurUwMs9epvHC2xAWv8CLaRRwAJD7b4e4PahjnjjXByvGbfEuWkfJbeuWzcM3hu5Pew52fkjqSa"
            }
        };

        console.log(dataSend);
        $http.post(url+'/Account/checkLogin', dataSend, { headers: { 'Content-Type': 'application/json' } })
        .success(function(result){
            $scope.success = result.success;
            if($scope.success == 1){
                $scope.hash = result.data.hash.chave;
                window.localStorage.setItem('HashUsuario', $scope.hash);

                $scope.id_usuario = result.data.id_usuario;
                window.localStorage.setItem('id_usuario', $scope.id_usuario);
                
                $state.go('tabs.home');
                console.log(result);
            } else {
                var alertPopup = $ionicPopup.alert({
                    title: 'Erro ao realizar o login.',
                    template: 'Email ou senha inválidos!'
                });

                alertPopup.then(function(res) {
                    console.log('Um erro ocorreu ao realizar o login!');
                });

                $timeout(function() {
                    alertPopup.close(); //Fecha o popup após 3 segundos
                }, 5000);
            }
        })
        .error(function(erro){
            var alertPopup = $ionicPopup.alert({
                title: 'Erro ao realizar o login.',
                template: 'Lamentamos que um erro inesperado tenha acontecido ao realizar o login, por favor tente novamente mais tarde. Obrigado.'
            });

            alertPopup.then(function(res) {
                console.log('Um errou ocorreu ao finalizar a pesquisa.');
            });

            $timeout(function() {
                alertPopup.close(); //Fecha o popup após 3 segundos
            }, 5000);

            console.log(erro);
        });
    };


    $scope.logout = function(){
        $state.go('login');
    };

    $scope.cadastrar = function(){
        $state.go('cadastroUm');
    };

    //Esqueci minha senha, popup juntamente com o método post enviando login e data de nascimento
    $scope.esqueciSenha = {};
    $scope.esqueciSenha = function() {

        //Popup esqueci minha senha
        var myPopup = $ionicPopup.show({
            template: '<label class="item item-input item-stacked-label"><span class="input-label">Email</span><input type="text" ng-model="esqueciSenha.email"></label>  <label class="item item-input item-stacked-label"> <span class="input-label">Data de nascimento</span><input type="date" ng-model="esqueciSenha.dataNascimento"></label>',
            title: 'Esqueci minha senha',
            subTitle: 'Confirme os dados',
            scope: $scope,

            buttons: [{
                text: 'Cancelar' }, {
                    text: '<b>Enviar</b>',
                    type: 'button button-stable',
                    onTap: function(e) {

                       if (!$scope.esqueciSenha) {
                        //don't allow the user to close unless he enters model...
                        e.preventDefault();
                    } else {
                        return $scope.esqueciSenha;
                    }
                }
            }]
        });

        myPopup.then(function(res) {
            $scope.dataNascimentoFormatada = $filter('date')($scope.esqueciSenha.dataNascimento, 'yyyy-MM-dd');
            var data = {
                "h" : "jdlk2m1m28md92290",
                "id_app":  "5880935fd4779ee0d202190e",
                "data": {
                    "data_hora": 1470904205,
                    "login" : $scope.esqueciSenha.email,
                    "data_nasc": $scope.dataNascimentoFormatada
                }   
            }

            $http.post(url+'/Account/forgetPassword', data, { headers: { 'Content-Type': 'application/json' } })
            .success(function(result){
                $scope.msg = result.msg.msg;
                $scope.mensagem = $scope.msg;
                
            })
            .error(function(erro){

                $scope.mensagem = 'Não foi possível recuperar a senha';
            });
        }); 
    };
});