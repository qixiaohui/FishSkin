const service = require("../service/service");
const config = require("../config/config");

export default (ngModule) => {
    ngModule.directive("login", () => {
        require('./login.css');
        return {
            restrict: "E",
            scope: true,
            template: require('./login.html'),
            controllerAs: "vm",
            controller: function($rootScope, $location, $scope, $timeout){
                const vm = this;

                vm.errorMessage = null;
                vm.user = {
                    email: null,
                    password: null
                };
                vm.register = {
                    email: null,
                    password: null
                };
                vm.loginShow = true;

                vm.login = () => {
                    let url = `${config.BASE_URL}${config.LOGIN}`;
                    let form = {
                        email: vm.user.email,
                        password: vm.user.password
                    };
                    service.post(url, null, form).then((response) => {
                        loginOrRegisterSuccess(response);
                    }).catch((error) => {
                        console.error(error.message);
                        vm.errorMessage = error.message;
                    });
                };

                vm.register = () => {
                    let url = `${config.BASE_URL}${config.REGISTER}`;
                    let form = {
                        email: vm.register.email,
                        password: vm.register.password
                    };
                    service.post(url, null, form).then((response) => {
                        loginOrRegisterSuccess(response);
                    }).catch((error) => {
                        console.error(error.message);
                        vm.errorRegisterMessage = error.message;
                    });
                }; 

                //*** declare all functions
                const cacheUser = (email, token) => {
                    const user = {
                        email: email,
                        token: token
                    };
                    localStorage.setItem("USER", JSON.stringify(user));
                };

                const loginOrRegisterSuccess = (response) => {
                        if (response.data.status == 400) {
                            vm.errorMessage = response.data.message;
                            return;
                        }
                        cacheUser(response.data.email, response.data.token);
                        $scope.$emit("LOGIN", response.data.email);
                        $location.path('/main/home');
                        $scope.$apply();
                };
            }
        }
    });
};