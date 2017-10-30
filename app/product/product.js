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
            controller: function($rootScope, $location, $scope, $timeout){
                const vm = this;
            }
        }
    });
};