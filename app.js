// Importações de libs
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require("cors");

const MONGO_URL = process.env.MONGO_URL;

// Criar a conexão
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log(`Conectado ao MongoDB: ${MONGO_URL}`);
  })
  .catch(err => {
    console.log(`Falha ao conectar com o MongoDB`);
    console.log(err);
  });


var indexRouter = require('./routes/index');
var feedbackRouter = require('./routes/feedback');

var app = express();

app.use(cors());
const prefix = '/api-node'

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(prefix+'/', indexRouter);
app.use(prefix+'/feedback', feedbackRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
