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
            	// Called on initialization
            	if (localStorage.getItem("USER")) {
            		vm.user = JSON.parse(localStorage.getItem("USER"));
            	} else {
            		// listen to login event
            		$scope.$on("LOGIN", (event, user) => {
            			vm.user = {};
            			vm.user.email = user;
            		});
            	}


            	//*** declare all the functions needed
            	vm.redirectLogin = () => {
            		$location.path('/main/login');
            	};
            }
        }
    });
};