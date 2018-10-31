const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./config/config');
const path = require('path');
const port = process.env.PORT || 3000;
const router = express.Router();

app.set('view engine', 'html');

app.use([bodyParser.json(), bodyParser.urlencoded({extended: true})]);
app.use(express.static(path.join(__dirname, '../client')));
app.use(function(err, req, res, next) {
  console.log(err);
  res.status(500).send('Server Error');
});

router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

mongoose.connect(config.database);
require('./config/passport')(passport);

var apiRoutes = require('./routes/api')();
var ticketRoutes = require('./routes/tickets')(passport);
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  next();
});
app.use('/api', apiRoutes);
app.use('/ticket', ticketRoutes);

app.listen(port, function(err) {
  err
    ? console.log('Cannot connect...', err)
    : console.log('Connected! Server is listening on port ', port);
});
