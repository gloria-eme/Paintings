const UserRoutes = require('express').Router();
const passport = require('passport');
require('./passportSetup');
const { isAuth } = require('../../middlewares/auth.middlewares');

const {
  register,
  login,
  getUsers,
  deleteUser,
  updateUser,
} = require('./controller.user');

// Facebook routes
UserRoutes.get('/auth/facebook', passport.authenticate('facebook'));
UserRoutes.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/fail',
  })
);

// Google routes
UserRoutes.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);
UserRoutes.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/fail',
  })
);

UserRoutes.get('/fail', (req, res) => {
  res.send('Failed attempt');
});

UserRoutes.post('/register', register);

UserRoutes.post('/login', login);
UserRoutes.get('/', getUsers);
//nuevo endpoint que genera auth con facebook, devuelve callback con token

UserRoutes.delete('/:id', [isAuth], deleteUser);
UserRoutes.patch('/:id', [isAuth], updateUser);

module.exports = UserRoutes;
