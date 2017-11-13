'use strict'

const express = require("express");
const router = express.Router();
const stripeConfig = require("../../config/stripe");
const publicKey = stripeConfig.publicKey;
const secretKey = stripeConfig.secretKey;

const stripe = require("stripe")(secretKey);

module.exports = (passport) => {
	router.post("/charge", (request, response) => {

		let charge = stripe.charges.create({
			amount: request.body.amount,
			currency: "usd",
			source: request.body.token,
			description: request.body.productId
		}, (error, charge) => {
			if (error) {
				console.error(error.message);
				response.status(400).send({
					message: error.message
				});
				return;
			}

			response.status(200).send(charge);
		});
	});

	return router;
};

