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
            controller: function($rootScope, $location, $scope, $timeout, dataprovider){
                const vm = this;

                vm.products = dataprovider.getProduct();
            }
    	}
    });
};