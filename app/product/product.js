const service = require("../service/service");
const config = require("../config/config");

export default (ngModule) => {
    ngModule.directive("product", () => {
        require('./product.css');
        return {
            restrict: "E",
            scope: true,
            template: require('./product.html'),
            controllerAs: "vm",
            controller: function($rootScope, $location, $scope, $timeout, dataprovider, location){
                const vm = this;

                // In case user is not logged in redirect to login page
                location.redirect();

                vm.product = dataprovider.getData();
                vm.isProductInCart = dataprovider.isProductInCart(vm.product);

                if (!vm.product) {
                	$location.path("/main/home");
                }

                //*** add functions to be used
                vm.addToCart = () => {
                	dataprovider.addProduct(vm.product);
                	$location.path("/main/cart");
                };

                vm.proceedToCheckout = () => {
                    $location.path("/main/cart");
                }

                vm.removeFromCart = () => {
                    dataprovider.removeProduct(vm.product);
                    vm.isProductInCart = false;
                }
            }
        }
    });
};