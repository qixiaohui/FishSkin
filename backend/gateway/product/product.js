'use strict'

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const product = require("../../model/product/schema");
const config = require("../../config/db");
const jwt = require('jsonwebtoken');

module.exports = (passport, autoIncrement) => {
	product(autoIncrement);
	router.get("/product/all", (request, response, next) => {
		Product.find({}, (error, products) => {
			if (error) response.status(401).send({status: 400, message: "Product not found"});

			response.status(200).send(products);
		});	
	});

	router.post("/product/create", passport.authenticate('jwt', { session: false }), (request, response) => {

	});

	return router;
};