const UserRoutes = require('express').Router();

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
UserRoutes.delete('/:id', deleteUser);
UserRoutes.patch('/:id', updateUser);

module.exports = UserRoutes;
