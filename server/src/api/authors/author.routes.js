const AuthorsRoutes = require('express').Router();

const {
  getAuthors,
  patchAuthor,
  postAuthor,
  deleteAuthor,
} = require('./controller.author');

AuthorsRoutes.get('/', getAuthors);
AuthorsRoutes.post('/', [isBasic], postAuthor);
AuthorsRoutes.patch('/:id', [isBasic], patchAuthor);
AuthorsRoutes.delete('/:id', [isAdmin], deleteAuthor);


module.exports = AuthorsRoutes;
