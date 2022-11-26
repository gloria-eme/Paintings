const passport = require('passport');
const config = require('./configs');
const UserRoutes = require('./user.routes');

require('dotenv').config();

const GoogleStrategy = require('passport-google-oauth2').Strategy;
const facebookStrategy = require('passport-facebook').Strategy;
//const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
//const TwitterStrategy = require('passport-twitter').Strategy;

// used to serialize the user for the session
passport.serializeUser(function (user, done) {
  done(null, user);
});

// used to deserialize the user
passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new facebookStrategy(
    {
      clientID: config.facebook.id,
      clientSecret: config.facebook.secret,
      callbackURL: 'http://localhost:8080/auth/facebook/callback',
      profileFields: [
        'id',
        'displayName',
        'name',
        'gender',
        'picture.type(large)',
        'email',
      ],
    },
    function (accessToken, refreshToken, profile, cb) {
      // TODO: logic to find or create new user with facebook profile and tokens
      User.findOrCreate({ facebook: profile.id }, function (err, user) {
        return done(err, user);
      });
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: config.google.id,
      clientSecret: config.google.secret,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
    }
  )
);
