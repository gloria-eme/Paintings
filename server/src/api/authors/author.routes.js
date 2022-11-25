const AuthorsRoutes = require('express').Router();
/* const upload = require('../../middlewares/file'); */
const {
  getAuthors,
  patchAuthor,
  postAuthor,
  deleteAuthor,
} = require('./controller.author');

const { isBasic } = require('../../middlewares/basic.middlewares');
const { isAdmin } = require('../../middlewares/admin.middlewares');

AuthorsRoutes.get('/', getAuthors);
AuthorsRoutes.post('/', [isBasic], postAuthor);
AuthorsRoutes.patch('/:id', [isBasic], patchAuthor);
AuthorsRoutes.delete('/:id', [isAdmin], deleteAuthor);
/* AuthorRoutes.patch(
  '/addAuthorToPainting/:id',
  [isBasic],
  upload.single('image'),
  addAuthorToPainting
); */

module.exports = AuthorsRoutes;
