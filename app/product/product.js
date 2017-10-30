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
            controller: function($rootScope, $location, $scope, $timeout, dataprovider){
                const vm = this;

                vm.product = dataprovider.getData();

                if (!vm.product) {
                	$location.path("/main/home");
                }

                //*** add functions to be used
                vm.addToCart = () => {
                	dataprovider.addProduct(vm.product);
                	$location.path("/main/cart");
                };
            }
        }
    });
};