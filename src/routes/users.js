const router = require('express').Router();

router.get('/user/signin', (req, res) => {
  res.render('users/signin');
});

router.get('/user/signup', (req, res) => {
  res.render('users/signup');
});
module.exports = router;