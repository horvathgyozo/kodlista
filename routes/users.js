var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // console.log(req.user);
  res.send('hello ' + req.user.username);
});

router.get('/settings', function(req, res, next) {
  res.send('settings');
});

module.exports = router;
