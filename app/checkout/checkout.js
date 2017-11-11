const service = require("../service/service");
const config = require("../config/config");
const axios = require("axios");

export default (ngModule) => {
    ngModule.directive("checkout", () => {
        require('./checkout.css');
        return {
            restrict: "E",
            scope: true,
            template: require('./checkout.html'),
            controllerAs: "vm",
            controller: function($rootScope, $location, $scope, $timeout, dataprovider, $http, location){
                const vm = this;

                // In case user is not logged in redirect to login page
                location.redirect();

                vm.card = {
                	number: null,
                	expiry: null,
                	cvc: null
                };

                vm.stripeCallback = (code, result) => {
                	if (result.error) {
                		window.alert("failed" + result.error.message);
                	} else {
					    $http.post('/charge', result)
					    .success(function(data, status, headers, config) {
					      alert(data);
					    }).error(function(data, status, headers, config) {
					      alert(data);
					    });
                	}
                }
            }
        }
    });
};