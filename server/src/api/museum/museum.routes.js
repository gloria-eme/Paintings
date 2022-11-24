const MuseumsRoutes = require('express').Router();
/* const upload = require('../../middlewares/file'); */
const {
  getMuseums,
  patchMuseum,
  postMuseum,
  deleteMuseum,
} = require('./controller.museum');

const { isAuth } = require('../../middlewares/auth.middlewares');

MuseumsRoutes.get('/', getMuseums);
MuseumsRoutes.post('/', [isAuth], postMuseum);
MuseumsRoutes.patch('/:id', [isAuth], patchMuseum);
MuseumsRoutes.delete('/:id', deleteMuseum);
/* MuseumsRoutes.patch(
  '/addAuthorToPainting/:id',
  [isAuth],
  upload.single('image'),
  addAuthorToPainting
); */

module.exports = MuseumsRoutes;
