
'use strict'

const express = require('express');
const router = express.Router();

const register = require('./gateway/user/register');
const signin = require('./gateway/user/signin');

router.use('/signup', register);
router.use('/signin', signin);

module.exports = router;