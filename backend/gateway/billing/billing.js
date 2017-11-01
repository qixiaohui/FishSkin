'use strict'

const express = require("express");
const router = express.Router();
const stripeConfig = require("../../config/stripe");
const publicKey = stripeConfig.publicKey;
const secretKey = stripeConfig.secretKey;

const stripe = require("stripe")(secretKey);

module.exports = (passport) => {
	router.post("/billing", (request, response) => {

	});

	return router;
};

