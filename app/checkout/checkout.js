const service = require("../service/service");
const config = require("../config/config");

export default (ngModule) => {
    ngModule.directive("checkout", () => {
        require('./checkout.css');
        return {
            restrict: "E",
            scope: true,
            template: require('./checkout.html'),
            controllerAs: "vm",
            controller: function($rootScope, $location, $scope, $timeout, dataprovider){
                const vm = this;

                vm.card = {
                	number: null,
                	expiry: null,
                	cvc: null
                };

                vm.stripeCallback = (code, result) => {
                	if (result.error) {
                		window.alert("failed" + result.error.message);
                	} else {
                		window.alert("succeed");
                	}
                }
            }
        }
    });
};