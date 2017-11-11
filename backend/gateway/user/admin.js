'use strict'

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../../model/user/schema").data;
const config = require("../../config/db");
const jwt = require('jsonwebtoken');

module.exports = (passport) => {
	router.post("/isadmin", passport.authenticate('jwt', { session: false }), (request, response) => {
		User.findOne({
			email: request.body.email
		}, (error, user) => {
			if (error) {
				response.send({status: false});
				return;
			}
			response.send({status: user.admin});
		});
	});

	return router;
};