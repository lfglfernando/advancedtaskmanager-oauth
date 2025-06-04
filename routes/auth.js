const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

router.get(
  '/google/callback',
  (req, res, next) => {
    console.log('REQ.originalUrl =', req.originalUrl);
    console.log('REQ full URL   =', `${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
  },
  passport.authenticate('google', {
    failureRedirect: '/auth/failure',
    session: true
  }),
  (req, res) => {
    res.json({
      message: 'Login successful',
      user: req.user
    });
  }
);

router.get('/failure', (req, res) => {
  res.status(401).json({ message: 'Google authentication failed' });
});

router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).json({ message: 'Logout error', error: err });
    res.json({ message: 'Logged out' });
  });
});

module.exports = router;
