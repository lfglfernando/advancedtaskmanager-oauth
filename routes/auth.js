
const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'], 
    prompt: 'select_account',      
    accessType: 'offline'      
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  (req, res) => {
    res.redirect('/auth/success');
  }
);

router.get('/success', (req, res) => {
  res.json({ message: 'Login successful', user: req.user });
});

router.get('/failure', (req, res) => {
  res.status(401).json({ message: 'Login failed' });
});

router.get('/status', (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ loggedIn: true, user: req.user });
  }
  res.json({ loggedIn: false });
});

router.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) return res.status(500).json({ message: 'Logout error' });
    res.json({ message: 'Logged out' });
  });
});

module.exports = router;
