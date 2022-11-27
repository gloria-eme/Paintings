const AuthorsRoutes = require('express').Router();

const {
  getAuthors,
  patchAuthor,
  postAuthor,
  deleteAuthor,
} = require('./controller.author');

AuthorsRoutes.get('/', getAuthors);
AuthorsRoutes.post('/', postAuthor);
AuthorsRoutes.patch('/:id', patchAuthor);
AuthorsRoutes.delete('/:id', deleteAuthor);
AuthorRoutes.patch(
  '/addAuthor/:id',
  upload.single('image'),
  addAuthorToPainting
);

module.exports = AuthorsRoutes;
