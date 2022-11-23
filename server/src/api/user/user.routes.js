const UserRoutes = require('express').Router();

const { isAuth } = require('../../middlewares/auth.middlewares');

const {
  register,
  login,
  getUsers,
  deleteUser,
  updateUser,
} = require('./controller.user');

UserRoutes.post('/register', register);
UserRoutes.post('/login', login);
UserRoutes.get('/', getUsers);
UserRoutes.delete('/:id', [isAuth], deleteUser);
UserRoutes.patch('/:id', [isAuth], updateUser);

module.exports = UserRoutes;
