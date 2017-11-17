'use strict'

const express = require("express");
const router = express.Router();
const Card = require("../../model/card/schema").data;
const stripeConfig = require("../../config/stripe");
const publicKey = stripeConfig.publicKey;
const secretKey = stripeConfig.secretKey;

const stripe = require("stripe")(secretKey);

module.exports = (passport) => {
	router.post("/charge", passport.authenticate('jwt', { session: false }), (request, response) => {

		let charge = stripe.charges.create({
			amount: request.body.amount,
			currency: "usd",
			source: request.body.token,
			description: request.body.productId,
			receipt_email: request.body.email
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

	router.post("/saveCard", passport.authenticate('jwt', { session: false }), (request, response) => {
		// TODO: remove this once client side implemnet address
		request.body.address = request.body.address? request.body.address : "default";
		request.body.city = request.body.city? request.body.city : "default";
		request.body.zip = request.body.zip? request.body.zip : 0;
		request.body.state = request.body.state? request.body.state : "default";

		var card = new Card({
			token: request.body.token,
			cardId: request.body.cardId,
			address: request.body.address,
			city: request.body.city,
			zip: request.body.zip,
			state: request.body.state,
			brand: request.body.brand,
			expiry: request.body.expiry,
			lastFour: request.body.lastFour,
			holderEmail: request.body.holderEmail
		});

		card.save((error) => {
			if (error) {
				return response.send({status: 400, message: error.message});
			}
			return response.status(200).send({
				success: true
			});
		});
	});

	router.get("/card", passport.authenticate('jwt', { session: false }), (request, response) => {
		if (!request.headers.email) {
			response.status(401).send({status: 400, message: "No email provided"});
			return;
		}

		Card.find({holderEmail: request.headers.email}, (error, cards) => {
			if (error || !cards || cards instanceof Array && cards.length == 0) response.status(401).send({status: 400, message: "No card found"});

			return response.status(200).send(cards);
		});
	});

	router.post("/removecard", passport.authenticate('jwt', { session: false }), (request, response) => {
		if (!request.body.email || !request.body.cardId) {
			response.status(401).send({status: 400, message: "No email or card provided"});
			return;
		}

		Card.deleteOne({holderEmail: request.body.email, cardId: request.body.cardId}, (error) => {
			if (error) {
				return response.status(400).send({message: error});
			}
			Card.find({holderEmail: request.body.email}, (error, cards) => {
				if (error) {
					response.status(200).send([]);
				}

				response.status(200).send(cards);
			});
		});
	});

	return router;
};

