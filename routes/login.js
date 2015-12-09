var express = require('express');
var passport = require('passport');

var router = express.Router();

router.get('/login', function(req, res, next) {
  res.render('login');
});
router.post('/login', 
	passport.authenticate('local', { 
		successRedirect: '/users',
        failureRedirect: '/auth/login' 
	})
);


module.exports = router;
