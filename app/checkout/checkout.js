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

                location.shouldRedirectHome(dataprovider.getProduct());
                vm.cards = [];
                vm.card = {
                	number: null,
                	expiry: null,
                	cvc: null
                };

                vm.getCard = () => {
                	var header = {email: dataprovider.getEmail()};
                	service.get(`${config.BASE_URL}${config.GET_CARD}`, header).then((response) => {
                		if (response 
                			&& response.data 
                			&& response.data instanceof Array 
                			&& response.data.length > 0) {
                			vm.cards = response.data;
                			$scope.$apply();
                		} 
                	}).catch((error) => {
                		console.error(error.message);
                	});
                };

                vm.getCard();

                vm.saveCustomerAndCharge = (card) => {
            		let body = {
            			amount: 100,
            			description: "",
            			holderEmail: dataprovider.getEmail(),
            			source: card.id,
            			cardId: card.card.id,
            			brand: card.card.brand,
            			expiry: card.card.exp_month + "/" + card.card.exp_year,
            			lastFour: card.card.last4
            		};

                	service.post(`${config.BASE_URL}${config.CREATE_CUSTOMER_AND_CHARGE}`, null, body).then((response) => {
	    				$location.path("/main/success");
	    				$scope.$apply();
                	}).catch((error) => {
                		console.error(error.message);
                	});
                }

                vm.getToken = () => {
                	Stripe.card.createToken({
                		number: vm.card.number,
                		exp_month: vm.card.expiry.split("/")[0],
                		exp_year: vm.card.expiry.split("/")[1],
                		cvc: vm.card.cvc
                	}, (status, response) => {
                		if (status == 200) {
                			// After getting the token from stripe
                			// Call /createCustomerAndCharge api to 
                			// Create customer and charge
                			vm.saveCustomerAndCharge(response);
                		} else {
                			console.error(response.error.message);
                			alert(response.error.message);
                		}
                	});
                };

                vm.saveCard = (body) => {
                	service.post(`${config.BASE_URL}${config.SAVE_CARD}`, null, body).then((response) => {
                		console.log(response.data);
                	}).catch((error) => {
                		console.error(error.message);
                		alert(error.message);
                	});
                };

                vm.removeCard = (id) => {
                	var body = {
                		email: dataprovider.getEmail(),
                		cardId: id
                	};
                	service.post(`${config.BASE_URL}${config.REMOVE_CARD}`, null, body).then((response) => {
                		vm.cards = response.data;
                		$scope.$apply();
                	}).catch((error) => {
                		console.error(error.message);
                	});
                };

                vm.useThisCard = (card) => {
                	var body = {
                		amount: 100,
                		currency: "usd",
                		token: card.token,
                		description: "",
                		email: card.holderEmail
                	};

                	vm.makeCardPayment(false/**Save card */, body);
                };

                vm.makeCardPayment = (card) => {
        			var body = {
        				amount: 100,
        				currency: "usd",
        				description: "",
        				cardId: card.cardId,
        				email: dataprovider.getEmail()
        			};

	    			service.post(`${config.BASE_URL}${config.BILLING}`, null, body).then((response) => {
	    				$location.path("/main/success");
	    				$scope.$apply();
	    			}).catch((error) => {
	    				console.error(error.message);
	    				alert(error.message);
	    			});
                }
            }
        }
    });
};