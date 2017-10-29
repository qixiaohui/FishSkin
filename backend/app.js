'use strict';

const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
const compress = require('compression');
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require("passport");
const _ = require('underscore');
var port = 8080;
const autoIncrement = require('mongoose-auto-increment');
const config = require('./config/db');

app.get('/', function (req, res) {
	app.use(express.static('./app/'));
	res.sendfile('./app/index.html');
});

// Enable cors
app.use((request, response, next) => {
	response.header({"Access-Control-Allow-Origin": "*"});
	response.header({"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"});
	next();
});

app.use(bodyParser.urlencoded({extend: true}));
app.use(bodyParser.json());
app.use(compress());
app.use(cors());
app.use(cookieParser());

let connection = mongoose.connect(config.database);
autoIncrement.initialize(connection);

const router = require('./router')(app, autoIncrement);
app.use(router);

if(process.env.NODE_ENV == 'production') {
	app.use(logger('tiny'));
	port = 3000;
}else{
	app.use(logger('dev'));
}

app.get('/ping', function(req, res) {
	res.send('pong');
});

app.listen(process.env.PORT || port, function(){
	console.log("server listening on port: "+(process.env.PORT || port));
});
