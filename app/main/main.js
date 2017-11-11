export default (ngModule) => {
    ngModule.directive("main", () => {
        require('./main.css');
        return {
            restrict: "E",
            scope: true,
            template: require('./main.html'),
            controllerAs: "vm",
            controller: function($rootScope, $location, $scope, $timeout){
            	const vm = this;

            	vm.user = null;
                vm.admin = false;
                $scope.$on('$stateChangeSuccess', () => {
                    if ($location.path().indexOf("admin") > -1) {
                        vm.admin = true;
                    } else {
                        vm.admin = false;
                    }
                });

            	// Called on initialization
            	if (localStorage.getItem("USER")) {
            		vm.user = JSON.parse(localStorage.getItem("USER"));
            	} else {
            		// listen to login event
            		$scope.$on("LOGIN", (event, user) => {
            			vm.user = {};
            			vm.user.email = user.email;
            		});
            	}


            	//*** declare all the functions needed
            	vm.redirectLogin = () => {
            		$location.path('/main/login');
            	};

                vm.signout = () => {
                    vm.user = null;
                    localStorage.removeItem('USER');
                    $location.path('/main/login');
                }
            }
        }
    });
};