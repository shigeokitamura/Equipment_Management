const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const User = require('../models/user');

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  else return res.redirect('/equipment/');
}

router.get('/', (req, res, next) => {
  Book.info
  .findAll()
  .then(books_info => {
    Book.manage
    .findAll()
    .then(books_manage => {
      User
      .findAll()
      .then(user => {
        res.render('book_list', {
          title: '本一覧',
          user: req.user,
          books_info: books_info,
          books_manage: books_manage,
          books_user: user,
          error: req.flash('error')
        });
      });
    });
  });
});

router.get('/new', isAuthenticated, (req, res, next) => {
  res.render('book_new',
  {
    title: '本新規登録',
    error: req.flash('error'),
    user: req.user
  });
});

router.post('/new', isAuthenticated, (req, res, next) => {
  Book.manage.findOne({where: {isbn: req.body.isbn} })
  .then(book => {
    if (!book) {
      Book.info.create(req.body)
      .then(() => {
        Book.manage.create(req.body)
        .then(() => {
          res.redirect('/equipment/books');
        });
      });
    } else {
      req.flash('error', '既に登録されています');
      res.redirect('/equipment/books/new');
    }
  });
});

router.get('/detail/:book_id', (req, res, next) => {
  Book.info
  .findOne({ where: {id: req.params.book_id } })
  .then(book_info => {
    Book.manage
    .findOne({ where: {id: req.params.book_id } })
    .then(book_manage => {
      res.render('book_detail',
      {
        title: '本の詳細',
        error: req.flash('error'),
        user: req.user,
        book_info: book_info,
        book_manage: book_manage
      });
    });
  });
});

router.get('/checkout', isAuthenticated, (req, res, next) => {
  if (req.query.isbn) {
    Book.info
    .findOne({ where: {isbn: req.query.isbn } })
    .then(book_info => {
      if (book_info) { // 本が見つかった
        Book.manage
        .findOne({ where: {isbn: req.query.isbn } })
        .then(book_manage => {
          res.render('book_checkout',
          {
            title: '本を借りる',
            error: req.flash('error'),
            user: req.user,
            book_info: book_info,
            book_manage: book_manage
          });
        });
      } else { // 本が見つからなかった
        req.flash('error', '本が見つかりませんでした．');
        res.render('book_checkout',
        {
          title: '本を借りる',
          error: req.flash('error'),
          user: req.user,
          book_info: null,
          book_manage: null
        });
      }
    });
  } else {
    res.render('book_checkout',
    {
      title: '本を借りる',
      error: req.flash('error'),
      user: req.user,
      book_info: null,
      book_manage: null
    });
  }
});

router.post('/checkout', isAuthenticated, (req, res, next) => {
  //res.send(req.body);
  const date = new Date();
  const date_str = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  Book.manage
  .findOne({ where: {isbn: req.body.isbn } })
  .then(book_manage => {
    if(book_manage.stock <= 0) {
      res.send('ERROR');
    } else {
      let username = book_manage.borrowedBy;
      console.log("username:" + username);
      if (username == 'null') {  //既に借りている人がいたら,で区切る
        username = req.body.user;
      } else {
        username += ',';
        username += req.body.user;
      }

      Book.manage
      .update({
        borrowedBy: username,
        stock: book_manage.stock - 1,
        borrowedAt: date_str
      },
        {where: {id: book_manage.id}
      })
      .then(result => {
        console.log(result);
        res.redirect('/equipment/books');
      });
    }
  });
});

router.get('/return', isAuthenticated, (req, res, next) => {
  const regex = '%' + req.user.userid + '%';
  Book.info
  .findAll()
  .then(books_info => {
    Book.manage
    .findAll({
      where: {
        borrowedBy: {
          $like: regex
        }
      }
    }).then(books_manage => {
      res.render('book_return',
      {
        title: '本を返却する',
        error: req.flash('error'),
        user: req.user,
        books_info: books_info,
        books_manage: books_manage
      });
    });
  });
});

router.post('/return', isAuthenticated, (req, res, next) => {
  const date = new Date();
  const date_str = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  Book.manage
  .findOne({ where: {isbn: req.body.isbn} })
  .then(book_manage => {
    const users = book_manage.borrowedBy.split(',');
    const index = users.indexOf(req.body.user);
    if (index > -1) {
      users.splice(index, 1);
    }
    const users_new = users.join(',');
    let borrowedAt = book_manage.borrowedAt;
    if (users_new == '') {
      borrowedAt = null;
    }
    Book.manage
    .update({
      stock: book_manage.stock + 1,
      borrowedBy: users_new,
      borrowedAt: borrowedAt,
      returnedBy: req.body.user,
      returnedAt: date_str
    },
      {where: {id: book_manage.id}
    })
    .then(result => {
      console.log(result);
      res.redirect('/equipment/books/return');
    });
  });
});

module.exports = router;
