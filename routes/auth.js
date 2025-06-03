// routes/auth.js
const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');
const router = express.Router();

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  (req, res) => {
    res.redirect('/auth/success');
  }
);

router.get('/success', authController.loginSuccess);
router.get('/failure', authController.loginFailure);
router.get('/logout', authController.logout);
router.get('/status', authController.checkStatus);

module.exports = router;
