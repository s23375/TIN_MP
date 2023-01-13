var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const authUtil = require("./utils/authUtil");

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

//date formatting placed BEFORE routes
const fmt = require("./utils/dateFormatting");
app.use((req, res, next) => {
    res.locals.fmt = fmt;
    next();
})

// something to avoid errors with Cross-Origin Resource Sharing
var cors = require("cors");
app.use(cors());

// session stuff
const session = require('express-session');
app.use(session({ //TODO deprecated???
    secret: "my_secret_password",
    resave: false
}));

app.use( (req, res, next) => {
    const loggedUser = req.session.loggedUser;
    res.locals.loggedUser = loggedUser;
    if(!res.locals.loginError) {
        res.locals.loginError = undefined;
    }
    next();
})

//internationalization stuff
const i18n = require("i18n");
i18n.configure({
    locales: ["pl", "en"], //languages available
    directory: path.join(__dirname, "locales"), //path to directory where dictionaries are stored
    objectNotation: true, //enables using nested keys in object notation
    cookie: "cookie-lang" // the name of cookies where language info is stored
});
app.use(i18n.init);
app.use(cookieParser("secret"));
app.use((req, res, next) => {
    if(!res.locals.lang) {
        const currentLang = req.cookies["cookie-lang"];
        res.locals.lang = currentLang;
    }
    next();
})


// using routes
app.use('/', indexRoute); // default router
app.use('/ProductModel', authUtil.permitAuthenticatedUser, productModelRoute);
app.use('/Order', authUtil.permitAuthenticatedUser, orderRoute);
app.use('/OrderedProducts', authUtil.permitAuthenticatedUser,orderedProductsRoute);

// calling the monstrosity that is config/sequelize/init.js
const sequelizeInit = require('./config/sequelize/init');
sequelizeInit()
    .catch(err => {
      console.log(err);
    })

// adding API routes
const productApiRoute = require('./routes/api/ProductModelApiRoute');
const orderedApiRoute = require('./routes/api/OrderedProductsApiRoute');
const orderApiRoute = require('./routes/api/OrderApiRoute');
const userApiRoute = require("./routes/api/UserApiRoute");
const authApiRouter = require("./routes/api/AuthApiRoute");


app.use('/api/products', productApiRoute);
app.use('/api/ordereds', orderedApiRoute);
app.use('/api/orders', orderApiRoute);
app.use('/api/users', userApiRoute);
app.use("/api/auth", authApiRouter)

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
