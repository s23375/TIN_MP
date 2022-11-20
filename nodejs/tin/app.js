var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

/*routers */
var indexRoute = require('./routes/indexRoute');
const productModelRoute = require('./routes/productModelRoute');
const orderRoute = require('./routes/orderRoute');
const orderedProductsRoute = require('./routes/orderedProductsRoute');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// using routes
app.use('/', indexRoute); // default router
app.use('/ProductModel', productModelRoute);
app.use('/Order', orderRoute);
app.use('/OrderedProducts', orderedProductsRoute);

// calling the monstrosity that is config/sequelize/init.js
const sequelizeInit = require('./config/sequelize/init'); //TODO causing a crash, go to config/sequelize/sequelize.js
sequelizeInit()
    .catch(err => {
      console.log(err);
    })

// adding API routes
const productApiRoute = require('./routes/api/ProductModelApiRoute');
app.use('/api/products', productApiRoute);

//app.use('/users', usersRouter); // if we type /user it sends us here
// there aren't actually files, if our path is localhost/users/1/books/5
// it actually means /users/:id/books/:bid

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
