const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const sqlite3 = require('sqlite3');
const crypto = require('crypto');

global.encrypt = password => {
  const sha512 = crypto.createHash('sha512');
  sha512.update(password);
  const hash = sha512.digest('hex');
  return hash;
}

router.get('/', (req, res, next) => {
  User
  .findAll()
  .then(users => {
    res.render('signup', {
      title: 'User Register',
      users: users,
      error: req.flash('error')
    });
  });
});

router.get('/login', (req, res, next) => {
   if(req.isAuthenticated()) return res.redirect('/');
   res.render('signin',
   {
     title: 'ログイン',
     error: req.flash('error')
   });
});

router.post('/signin', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}));

router.get('/signup', (req, res, next) => {
  res.render('signup', {
    title: '新規登録',
    error: req.flash('error')
  });
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/:user_id/destroy', (req, res, next) => {
  User.destroy({
    where: {id: req.params.user_id}
  }).then(() => {
      res.redirect('/users');
    });
});

router.get('/:user_id/profile', (req, res, next) => {
  User
  .findOne({ where: {id: req.params.user_id } })
  .then(user => {
    res.send(user);
  });
});

router.post('/signup', (req, res, next) => {
  if (req.body.password != req.body.password_confirm) {
    req.flash('error', 'パスワードが一致しません');
    res.redirect('/users/signup')
  } else {
    User.findOne({where: {userid : req.body.userid} })
    .then(user => {
      if (!user){
        req.body.password = encrypt(req.body.password);
        User.create(req.body)
        .then(user => {
            res.redirect('/');
        });
      } else {
        req.flash('error', '既に登録されています');
        res.redirect('/users/signup');;
      }
    });
  }
});

module.exports = router;
