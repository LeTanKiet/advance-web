import passport from 'passport';
import passportFacebook from 'passport-facebook';
const FacebookStrategy = passportFacebook.Strategy;

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: '/auth/facebook/callback',
      profileFields: ['emails', 'displayName', 'name', 'picture'],
      passReqToCallback: true,
    },
    function (req, accessToken, refreshToken, profile, cb) {
      req.profile = profile;
      cb(null, profile);
    },
  ),
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
