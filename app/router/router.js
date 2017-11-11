
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
        ).state(
            'main.product', {
                url: '/product',
                template: '<product></product>'
            }
        ).state(
            'main.cart', {
                url: '/cart',
                template: '<cart></cart>'
            }
        ).state(
            'main.checkout', {
                url: '/checkout',
                template: '<checkout></checkout>'
            }
        ).state(
            'main.admin', {
                url: '/admin',
                template: '<admin></admin>'
            }
        );

        $urlRouterProvider.otherwise('/main/home');
    });
};