const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');

const User = require("../models/user");


exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/auth/login',
    pageTitle: 'Login'
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('auth/login', {
      path: '/auth/login',
      pageTitle: 'Login'
    });
  }

  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return res.status(422).render('auth/login', {
          path: '/auth/login',
          pageTitle: 'Login',
          errorMessage: 'Invalid email or password.',
          oldInput: {
            email: email,
            password: password
          }
        });
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            return password.save().then(err => {
              console.log(err);
              res.redirect('auth/login');
            });
          }
          return res.status(422).render('auth/login', {
            path: '/auth/login',
            pageTitle: 'Login',
            errorMessage: 'Invalid email or password.',
          });
        })
        .catch(err => {
          console.log(err);
          res.redirect('/home');
        });
    })
    .catch(err => console.log(err));
};


exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/auth/signup',
    pageTitle: 'Signup'
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render('auth/sigup', {
      path: '/auth/signup',
      pageTitle: 'Signup',
      validationErrors: errors.array()
    });
  }

  bcrypt
    .hash(password, 12)
    .then(hashedPassword => {
      const user = new User({
        email: email,
        password: hashedPassword,
      });
      return user.save();
    })
    .then(result => {
      res.redirect('/auth/login');
    }).catch(err => {
      console.log(err)
    })
    .catch(err => {
      console.log(err);
    });
};
