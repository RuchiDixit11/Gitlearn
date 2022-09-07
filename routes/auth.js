var express = require('express');
var router = express.Router(); 
const authController = require('../controller/authController')

/* GET signup page. */
router.get('/', function(req, res, next) {
    res.render('signup');
  });

  router.get('/users/home', function(req, res) {
    res.render('home');
    // res.json({ message: "Welcome to home page" });s
    // res.redirect('home')
  });


/* GET login page. */
router.get('/users/login', function(req, res) {
  res.render('login');
});

router.post('/users/login', (req, res, next) => {
			// res.redirect('home');
     authController.signIn(req, res)

})

router.post('/users/signup', function(req, res, next) {
  console.log("signup page");

  authController.signUp(req, res, next);
})  

// router.post('/users/signup', authController.signUp)
module.exports = router;

 