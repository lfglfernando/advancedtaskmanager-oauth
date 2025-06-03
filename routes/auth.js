// routes/auth.js
const express = require('express');
const passport = require('passport');
const controller = require('../controllers/authController');
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  (req, res) => res.redirect('/auth/success')
);

router.get('/success', controller.loginSuccess);
router.get('/failure', controller.loginFailure);
router.get('/logout', controller.logout);
router.get('/status', controller.checkStatus);

module.exports = router;
