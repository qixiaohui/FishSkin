import 'bootstrap/dist/css/bootstrap.css';
import 'angular';
import angularAnimate from 'angular-animate';
import angularUIRouter from 'angular-ui-router';
import angularSanitize from 'angular-sanitize';

const app = angular.module('app', [angularAnimate, angularUIRouter, angularSanitize, 'angularPayments']);

require('./main/main').default(app);
require('./home/home').default(app);
require('./login/login').default(app);
require('./product/product').default(app);
require('./cart/cart').default(app);
require('./checkout/checkout').default(app);
require('./service/dataProvider').default(app);

require('./router/router').default(app);

Stripe.setPublishableKey('fillMePlease')
