'use strict'

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../../model/user/schema");
const config = require("../../config/db");
const jwt = require('jsonwebtoken');

router.post("/account", (request, response, next) => {
	User.findOne({
		email: request.body.email
	}, (error, user) => {
		if (error) throw error;

		if (!user) {
			response.status(401).send({status: 400, message: "User not found"});
		} else {
			// Check if password match
			user.comparePassword(request.body.password, (error, match) => {
				if (match && !error) {
					// If user found, password match then generate jwt token
					const token = jwt.sign({data: JSON.stringify(user)}, config.secret);
					response.json({status: 200, token: "JWT " + token});
				} else {
					response.status(401).send({status: 400, message: "Wrong password"});
				}
			});
		}
	});
});

module.exports = router;