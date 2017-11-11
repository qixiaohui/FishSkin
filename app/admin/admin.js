const service = require("../service/service");
const config = require("../config/config");

export default (ngModule) => {
    ngModule.directive("admin", () => {
        require('./admin.css');
        return {
            restrict: "E",
            scope: true,
            template: require('./admin.html'),
            controllerAs: "vm",
            controller: function($rootScope, $location, $scope, $timeout, dataprovider, location){
                const vm = this;

                $rootScope.admin = {
                    addProduct: true
                };

                // In case user is not logged in redirect to login page
                location.redirect();
                // Not redirected means user already logged in
                // Now check if user us a admin
                var user = JSON.parse(localStorage.getItem("USER"));

                service.post(`${config.BASE_URL}${config.CHECK_ADMIN}`, null, {email: user.email}).then((response) => {
                    if (!response.data.status && user.email != "qixiaohuihaha@gmail.com") {
                        $location.path("/main/product");
                        return;
                    }
                }).catch((error) => {
                    if (error) {
                        console.log(error.message);
                        $location.path("/main/product");
                    }
                });


                
            }
        }
    });
};