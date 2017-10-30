
export default ngModule => {
    ngModule.config(($stateProvider, $urlRouterProvider) => {
        $stateProvider.state(
            'main', {
                url: '/main',
                template: '<main></main>'
            }
        ).state(
        	'main.home', {
        		url: '/home',
        		template: '<home></home>'
        	}
        ).state(
        	'main.login', {
        		url: '/login',
        		template: '<login></login>'
        	}
        );

        $urlRouterProvider.otherwise('/main/home');
    });
};