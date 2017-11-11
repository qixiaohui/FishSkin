'use strict'

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../../model/product/schema").data;
const config = require("../../config/db");
const jwt = require('jsonwebtoken');

module.exports = (passport) => {
	router.get("/all", (request, response, next) => {
		Product.find({}, (error, products) => {
			if (error) response.status(401).send({status: 400, message: "Product not found"});

			return response.status(200).send(products);
		});	
	});

	router.post("/create", passport.authenticate('jwt', { session: false }), (request, response) => {
		console.log(JSON.stringify(request.body));
		var product = new Product({
			name: request.body.name,
			stock: request.body.stock,
			price: request.body.price,
			description: request.body.description,
			productImage: request.body.productImage,
			discountPrice: request.body.discountPrice,
			timestamp: request.body.timestamp,
			lastupdate: request.body.lastupdate
		});

		product.save((error) => {
			if (error) {
				return response.send({status: 400, message: error.message});
			}
			return response.status(200).send({
				producr: product,
				success: true
			});
		});
	});

	router.post("/remove", passport.authenticate('jwt', { session: false }), (request, response) => {
		Product.deleteOne({name: request.body.name}, (error) => {
			if (error) {
				return response.status(400).send({message: error});
			}
			response.status(200).send({message: "success"});
		});
	})

	return router;
};