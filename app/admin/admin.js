const service = require("../service/service");
const config = require("../config/config");

export default (ngModule) => {
    ngModule.directive("admin", () => {
        require('./admin.css');
        return {
            restrict: "E",
            scope: true,
            template: require('./admin.html'),
            controllerAs: "vm",
            controller: function($rootScope, $location, $scope, $timeout, dataprovider, location){
                const vm = this;

                $rootScope.admin = {
                    addProduct: true
                };
                vm.product = {};
                vm.products = [];

                // In case user is not logged in redirect to login page
                location.redirect();
                // Not redirected means user already logged in
                // Now check if user us a admin
                var user = JSON.parse(localStorage.getItem("USER"));

                service.post(`${config.BASE_URL}${config.CHECK_ADMIN}`, null, {email: user.email}).then((response) => {
                    if (!response.data.status && user.email != "qixiaohuihaha@gmail.com") {
                        $location.path("/main/product");
                        return;
                    }
                }).catch((error) => {
                    if (error) {
                        console.log(error.message);
                        $location.path("/main/product");
                    }
                });


                //************** declare functions here*********
                vm.createProduct = () => {
                    // split by "/n" into array
                    vm.product.productImage = vm.product.productImage.split("\n");
                    vm.product.description = vm.product.description.split("\n");
                    var body = vm.product;
                    service.post(`${config.BASE_URL}${config.CREATE_PRODUCT}`, null, body).then((response) => {
                        alert(JSON.stringify(response.data));
                        vm.product = {};
                        $scope.$apply();
                    }).catch((errror) => {
                        console.error(error.message);
                        alert(error.message);
                    });
                }

                vm.getProducts = () => {
                    service.get(`${config.BASE_URL}${config.PRODUCT_ALL}`, null).then((response) => {
                        vm.products = response.data;
                        $scope.$apply();
                    }).catch((error) => {
                        console.error(error.message);
                    });
                }

                vm.getProducts();

                vm.removeProduct = (name) => {
                    service.post(`${config.BASE_URL}${config.REMOVE_PRODUCT}`, null, {name: name}).then((response) => {
                        vm.getProducts();
                    }).catch((error) => {
                        console.error(error.message);
                        alert(error.message);
                    });
                }
            }
        }
    });
};