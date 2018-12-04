const router = require('express').Router();
const passport = require('passport');

// Models
const User = require('../models/User');

router.get('/user/signin', (req, res) => {
  res.render('users/signin');
});

router.get('/user/signup', (req, res) => {
  res.render('users/signup');
});

router.post('/users/signup', async (req, res) => {
  let errors = [];
  const { name, email, password, confirm_password } = req.body;
  if(password != confirm_password) {
    errors.push({text: 'Passwords do not match.'});
  }
  if(password.length < 4) {
    errors.push({text: 'Passwords must be at least 4 characters.'})
  }
  if(errors.length > 0){
    res.render('users/signup', {errors, name, email, password, confirm_password});
  } else {
    // Look for email coincidence
    const emailUser = await User.findOne({email: email});
    if(emailUser) {
      req.flash('error_msg', 'The Email is already in use.');
      res.redirect('/user/signup');
    } else {
      // Saving a New User
      const newUser = new User({name, email, password});
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash('success_msg', 'You are registered.');
      res.redirect('/user/signin');
    }
  }
});

router.post('/users/signin', passport.authenticate('local', {
  successRedirect: '/notes',
  failureRedirect: '/user/signin',
  failureFlash: true
}));


module.exports = router;