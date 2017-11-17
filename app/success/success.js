const service = require("../service/service");
const config = require("../config/config");

export default (ngModule) => {
    ngModule.directive("success", () => {
        require('./success.css');
        return {
            restrict: "E",
            scope: true,
            template: require('./success.html'),
            controllerAs: "vm",
            controller: function($rootScope, $location, $scope, $timeout, dataprovider, location){
                const vm = this;

                // In case user is not logged in redirect to login page
                location.redirect();

                location.shouldRedirectHome(dataprovider.getProduct());

                dataprovider.clearCart();

                var email = dataprovider.getEmail();

                vm.username = email.substring(0, email.indexOf('@'));

                vm.continueShopping = () => {
                	$location.path("/main/home");
                }
            }
        }
    });
};