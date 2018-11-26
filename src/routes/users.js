const router = require('express').Router();

router.get('/user/signin', (req, res) => {
  res.send('Signin');
});

router.get('/user/signup', (req, res) => {
  res.send('Signup');
});
module.exports = router;