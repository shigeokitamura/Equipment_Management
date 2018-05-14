var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '松下組備品管理システム', user: req.user});
});

module.exports = router;
