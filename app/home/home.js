const service = require("../service/service");
const config = require("../config/config");

export default (ngModule) => {
    ngModule.directive("home", () => {
        require('./home.css');
        return {
            restrict: "E",
            scope: true,
            template: require('./home.html'),
            controllerAs: "vm",
            controller: function($rootScope, $location, $scope, $timeout, dataprovider){
                const vm = this;

                const products = [];
                service.get(`${config.BASE_URL}${config.PRODUCT_ALL}`, null).then((response) => {
                    vm.products = response.data;
                    $scope.$apply();
                }).catch((error) => {
                    console.error(error.message);
                });

                //*** declare functions needed
                vm.seeDetail = (product) => {
                    dataprovider.setData(product);
                    $location.path("/main/product");
                }
            }
        }
    });
};