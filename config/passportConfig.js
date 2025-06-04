const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
      },
      (accessToken, refreshToken, profile, done) => {
        console.log('=== PROFILE RECIBIDO EN CALLBACK ===');
        console.log(profile); 
        console.log('accessToken:', accessToken);
        console.log('refreshToken:', refreshToken);
        done(null, profile);
      }
    )
  );
  