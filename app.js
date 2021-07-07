require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const createError = require('http-errors');

const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var passportRouter = require('./routes/passport');
var registerRouter = require('./routes/register');
var postsRouter = require('./routes/posts');
var commentsRouter = require('./routes/comments');


var app = express();
require('./passport');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE',
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));


app.use('/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/passport', passportRouter);


app.use('/api/register', registerRouter);
app.use('/api/posts', postsRouter);
app.use('/api/comments', commentsRouter);

app.use('/', indexRouter);


app.use((req, res, next) => next(createError(404)));

app.use((err, req, res, next) => {
    if(err.name == 'MongoError' || err.name == 'ValidationError' || err.name == 'CastError'){
        err.status = 422;
    }
    res.status(err.status || 500).json({message: err.message || "some error occurred."});
});


mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, err => {
    if(err) throw err;
    console.log('Connected successfully');
});

module.exports = app;
