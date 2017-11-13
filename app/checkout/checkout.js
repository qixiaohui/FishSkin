'use strict'

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

                vm.getToken = () => {
                	Stripe.card.createToken({
                		number: vm.card.number,
                		exp_month: vm.card.expiry.split("/")[0],
                		exp_year: vm.card.expiry.split("/")[1],
                		cvc: vm.card.cvc
                	}, (status, response) => {
                		if (status == 200) {
                			// After getting the token from stripe
                			// Call /charge api to charge the 
                			var body = {
                				amount: 100,
                				currency: "usd",
                				token: response.id,
                				description: ""
                			};
                			service.post(`${config.BASE_URL}${config.BILLING}`, null, body).then((response) => {
                				$location.path("/main/success");
                			}).catch((error) => {
                				console.error(error.message);
                				alert(error.message);
                			});
                		} else {
                			console.error(response.error.message);
                			alert(response.error.message);
                		}
                	});
                }

         //        vm.stripeCallback = (code, result) => {
         //        	if (result.error) {
         //        		window.alert("failed" + result.error.message);
         //        	} else {
					    // $http.post('/charge', result)
					    // .success(function(data, status, headers, config) {
					    //   alert(data);
					    // }).error(function(data, status, headers, config) {
					    //   alert(data);
					    // });
         //        	}
         //        }
            }
        }
    });
};