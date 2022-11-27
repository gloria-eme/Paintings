const AuthorsRoutes = require('express').Router();
/* const upload = require('../../middlewares/file'); */
const {
  getAuthors,
  patchAuthor,
  postAuthor,
  deleteAuthor,
} = require('./controller.author');

const { isAuth } = require('../../middlewares/auth.middlewares');

AuthorsRoutes.get('/', getAuthors);
<<<<<<< Updated upstream
AuthorsRoutes.post('/', [isAuth], postAuthor);
AuthorsRoutes.patch('/:id', [isAuth], patchAuthor);
AuthorsRoutes.delete('/:id', deleteAuthor);
=======
AuthorsRoutes.post('/', /* [isBasic], */ postAuthor);
AuthorsRoutes.delete('/:id', /* [isAdmin], */ deleteAuthor);
AuthorsRoutes.patch('/:id', /* [isBasic], */ patchAuthor);
>>>>>>> Stashed changes
/* AuthorRoutes.patch(
  '/addAuthorToPainting/:id',
  [isAuth],
  upload.single('image'),
  addAuthorToPainting
); */

module.exports = AuthorsRoutes;
