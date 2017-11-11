const service = require("../service/service");
const config = require("../config/config");

export default (ngModule) => {
    ngModule.directive("cart", () => {
        require('./cart.css');
        return {
            restrict: "E",
            scope: true,
            template: require('./cart.html'),
            controllerAs: "vm",
            controller: function($rootScope, $location, $scope, $timeout, dataprovider, location){
                const vm = this;

                // In case user is not logged in redirect to login page
                location.redirect();

                vm.products = dataprovider.getProduct();

                // declare functions needed
                vm.checkout = () => {
                    $location.path("/main/checkout");
                }
            }
    	}
    });
};