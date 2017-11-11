
'use strict'

const express = require('express');
const passport = require('passport');
const register = require('./gateway/user/register');
const signin = require('./gateway/user/signin');
const product = require('./gateway/product/product');
const billing = require('./gateway/billing/billing');
const admin = require('./gateway/user/admin');

module.exports = (passport) => {
	const router = express.Router();

	router.use('/signup', register(passport));
	router.use('/signin', signin(passport));
	router.use('/product', product(passport));
	router.use('/stripe', billing(passport));
	router.use('/admin', admin(passport));

	return router;
};