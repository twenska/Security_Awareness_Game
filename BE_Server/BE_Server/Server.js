#!/usr/bin/env node
const express = require('express');
const bodyParser = require('body-parser');
const content = require('./custom_modules/content_types');
const fs = require('fs');
const constructors = require('./custom_modules/custom_constructors');
const sqlController = require('./controllers/sql_controller');

var app = express();


//--MIDDLEWARE-----------------------------------------------------------------
//This piece of middleware will log the requests
app.use('/', function (req, res, next) {
  console.log(req.method + ': ' + req.url);
  next(); //next piece of middleware
});

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  //res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

/**bodyParser.json(options)
   Parses the text as JSON and exposes the resulting object on req.body. */
app.use(bodyParser.json());

//Requesting static files:
//Whenever the req.url starts with '/assets' this piece of middleware will
//serve the requested file
app.use('/assets', express.static('assets'));

//--CONTROLLERS----------------------------------------------------------------
sqlController(app);

//--404-Page-------------------------------------------------------------------
//Dynamic Routing for everything that doesn't use one of the above
app.all('/:file', function (req, res) {
  res.writeHead(200, content.html);
  fs.createReadStream(__dirname + '/404.html', 'utf8').pipe(res);
});

//Start server on Port 3001
app.listen(3001);

//--FUNCTIONS------------------------------------------------------------------
