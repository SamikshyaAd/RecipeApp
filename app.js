var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var passport = require('passport');
var authenticate = require('./authenticate');

var config = require('./config');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var recipeRouter = require('./routes/recipeRouter');
var feedbackRouter = require('./routes/feedbackRouter');
var generalFeedbackRouter = require('./routes/generalFeedbackRouter');
var promoRouter = require('./routes/promoRouter');
var founderRouter = require('./routes/founderRouter');
var uploadRouter = require('./routes/uploadRouter');
var favoriteRouter = require('./routes/favoriteRouter');

const mongoose = require('mongoose');

const Recipes = require('./models/recipes');

const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log('Connected correctly to the server');
}, (err) => {console.log(err);});

var app = express();

app.all('*',(req, res, next)=> {
  if(req.secure){
    next();
  }
  else{
    res.redirect(307,'https://'+req.hostname+':'+app.get('secPort')+ req.url);
  }
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/recipes', recipeRouter);
app.use('/imageUpload', uploadRouter);
app.use('/feedbacks',feedbackRouter);
app.use('/generalfeedbacks',generalFeedbackRouter);
app.use('/promotions', promoRouter);
app.use('/founders', founderRouter);
app.use('/favorites', favoriteRouter);


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
  res.render('error');
});

module.exports = app;
