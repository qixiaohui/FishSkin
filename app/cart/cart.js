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

                //********** declare functions needed **********
                vm.redirectHome = () => {
                    if (!vm.products || (vm.products instanceof Array && vm.products.length == 0)) {
                        $location.path("/main/home");
                    }
                }

                vm.redirectHome();

                vm.removeFromCart = (product) => {
                    vm.products = dataprovider.removeProduct(product);
                    // Check if current cart is empty, if so redirect to home page
                    vm.redirectHome();
                }

                vm.getTotal = () => {
                    var total = 0;
                    for (var i=0; i<vm.products.length; i++) {
                        var product = vm.products[i];
                        total += product.quantity*product.price;
                    }
                    return total;
                }
            }
    	}
    });
};