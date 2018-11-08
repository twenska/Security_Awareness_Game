#!/usr/bin/env node
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mainController = require('./controllers/mainController');
const sideController = require('./controllers/sideController');

const app = express();

//setting EJS as rendering-engine
app.set('view engine', 'ejs');

//--MIDDLEWARE-----------------------------------------------------------------
//This piece of middleware will log the requests
app.use('/', function (req, res, next) {
    console.log(req.method + ': ' + req.url);
    next(); //next piece of middleware
});

//Parses the text as JSON and exposes the resulting object on req.body.
app.use(bodyParser.json());
//Parses the Cookie and exposes the resulting object on req.cookies
app.use(cookieParser());

//Requesting static files:
//Whenever the req.url starts with '/assets' or '/scripts' this piece of 
//middleware will serve the requested file
app.use('/assets', express.static('assets'));
app.use('/scripts', express.static('scripts'));

//--CONTROLLERS----------------------------------------------------------------
mainController(app);
sideController(app);

//Start server on Port 3000
app.listen(3000);
