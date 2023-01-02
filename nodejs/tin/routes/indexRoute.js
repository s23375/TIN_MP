var express = require('express');
var router = express.Router();
const AuthController = require("../controllers/authController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { navLocation: 'main' }); // here we render
});

//session login logout section
router.post("/login", AuthController.login);
router.get("/logout", AuthController.logout);

//internationalization
const langController = require("../controllers/langController");
router.get("/changeLang/:lang", langController.changeLang);

module.exports = router;
