const UserRoutes = require('express').Router();

const { isAdmin } = require('../../middlewares/admin.middlewares');
const { isBasic } = require('../../middlewares/basic.middlewares');

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
UserRoutes.delete('/:id', [isAdmin], deleteUser);
UserRoutes.patch('/:id', [isAdmin], updateUser);

module.exports = UserRoutes;
