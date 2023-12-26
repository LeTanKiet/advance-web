import express from 'express';
import authController from '../controllers/auth.controller.js';
import { authentication } from '../middlewares/auth.js';
import passport from 'passport';
import '../hooks/useGoogleStrategy.js';
import '../hooks/useFacebookStrategy.js';

const authRoutes = () => {
  const router = express.Router();

  router.post('/sign-up', authController.signUp);
  router.post('/login', authController.login);
  router.get('/login/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
  router.get(
    '/login/google/callback',

    passport.authenticate('google', { failureRedirect: '/login/google' }),
    authController.loginGoogle,
  );

  router.get('/login/facebook', passport.authenticate('facebook', { scope: ['email'] }));
  router.get(
    '/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login/facebook' }),
    authController.loginFacebook,
  );
  router.post('/logout', authController.logout);
  router.get('/me', authentication, authController.getMe);
  router.get('/refresh', authentication, authController.refresh);
  router.patch('/profile', authentication, authController.updateProfile);

  return router;
};

export default authRoutes;
