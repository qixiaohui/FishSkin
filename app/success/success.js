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

                vm.continueShopping = () => {
                	$location.path("/main/home");
                }
            }
        }
    });
};