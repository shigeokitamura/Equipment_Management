const express = require('express');
const router = express.Router();
const Book = require('../models/book');

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  else return res.redirect('/');
};

router.get('/', (req, res, next) => {
  Book.info
  .findAll()
  .then(books => {
    res.render('book_list', {
      title: '本一覧',
      books: books,
      error: req.flash('error')
    });
  });
});

router.get('/new', (req, res, next) => {
  res.render('book_new',
  {
    title: '本新規登録',
    error: req.flash('error')
  });
});

router.post('/new', (req, res, next) => {
  Book.manage.findOne({where: {isbn: req.body.isbn} })
  .then(book => {
    if (!book) {
      Book.info.create(req.body)
      .then(() => {
        Book.manage.create(req.body)
        .then(() => {
          res.redirect('/books');
        });
      });
    } else {
      req.flash('error', '既に登録されています');
      res.redirect('/books/new');
    }
  });
});


module.exports = router;
