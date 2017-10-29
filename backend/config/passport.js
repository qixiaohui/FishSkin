'use strict'

const jwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;

// Load user model
const User = require("../model/user/schema").data;
const config = require("./db");

module.exports = (passport) => {
	var options = {};
	options.jwtFromRequest = extractJwt.fromAuthHeaderWithScheme('jwt');
	options.secretOrKey = config.secret;
	passport.use(new jwtStrategy(options, (payload, done) => {
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