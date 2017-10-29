
'use strict'

const express = require('express');
const passport = require('passport');
const register = require('./gateway/user/register');
const signin = require('./gateway/user/signin');
const product = require('./gateway/product/product');

module.exports = (app, autoIncrement) => {
	passport.initialize(app);
	const router = express.Router();

	router.use('/signup', register(passport, autoIncrement));
	router.use('/signin', signin(passport, autoIncrement));
	router.use('/product', product(passport, autoIncrement));

	return router;
};