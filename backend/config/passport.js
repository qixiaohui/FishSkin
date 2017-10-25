'use strict'

const jwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;

// Load user model
const User = require("../model/user/schema");
const config = require("./db");

module.exports = (passport) => {
	var options = {};
	options.jwtFormRequest = ExtractJwt.fromAuthHeader();
	options.secret = config.secret;
	passport.user(new JwtStrategy(options, (payload, done) => {
		User.findOne({id: payload.id}, (error, user) => {
			if (error) {
				return done(error, false);
			}

			if (user) {
				done(null, user);
			} else {
				done(null, false);
			}
		});
	}));
}