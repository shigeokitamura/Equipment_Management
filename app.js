const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const routes = require('./routes/index');
const users = require('./routes/users');
const books = require('./routes/books');
const equipments = require('./routes/equipments');

const User = require('./models/user');

const app = express();

// Passport config

passport.use(new LocalStrategy(
  {
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
  }, (req, userid, password, done) => {
    User.findOne({ where: {userid: userid } })
    .then(user => {
      if (!user) {
        return done(null, false, req.flash('error', 'ユーザが存在しません'));
      } else {
        if (user.password != encrypt(password)) {
          return done(null, false, req.flash('error', 'パスワードが間違っています'));
        }
      }
      return done(null, user);
    });
}));

passport.serializeUser((user, done) => {
  done(null, user.userid);
});

passport.deserializeUser((userid, done) => {
  User.findOne({ where: {userid: userid} })
  .then(user => {
    done(null, user);
  });
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());
app.use(session({
  secret: 'ssseeecccrrreeettt',
  name: 'ssseeecccrrreeettt',
  proxy: true,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/equipment', routes);
app.use('/equipment/users', users);
app.use('/equipment/books', books);
app.use('/equipment/equipments', equipments);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
