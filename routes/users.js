var express = require('express');
var router = express.Router();

var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

var tokenMap = {};

router.post('/login',
    passport.authenticate('local', { session: false }),
    function(req, res) {
      var token = new Date().valueOf() + Math.random().toFixed(6);
      tokenMap[token] = req.user;
      res.json(token);
    });

router.get('/detail', function(req, res, next) {
  var token = req.param('token');
  if(!token || !tokenMap[token]) {
    res.status(403).json('Token is invalid.');
  }
  var user = tokenMap[token];
  user.getDetail(function(err, detail) {
    if(err) {
      res.status(500).json('Unknown error.');
    }
    else {
      res.json(detail);
    }
  })
});

module.exports = router;
