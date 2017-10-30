'use strict'

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../../model/user/schema").data;

module.exports = (passport) => {
	router.post("/account", (request, response, next) => {
		if (!request.body.email || !request.body.password) {
			response.json({status: 400, message: "please provide username and password"});
		} else {
			var newUser = new User({
				email: request.body.email,
				password: request.body.password,
				admin: false
			});
			// Save the user
			newUser.save((error) => {
				if (error) {
					return response.json({status: 400, message: "email already registered"});
				}
				return response.status(200).send({
					user: newUser,
					email: newUser.email,
					success: true
				});
			});
		}
	});

	return router;
};