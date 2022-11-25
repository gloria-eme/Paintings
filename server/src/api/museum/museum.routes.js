const MuseumsRoutes = require('express').Router();
/* const upload = require('../../middlewares/file'); */
const {
  getMuseums,
  patchMuseum,
  postMuseum,
  deleteMuseum,
} = require('./controller.museum');

const { isBasic } = require('../../middlewares/basic.middlewares');
const { isAdmin } = require('../../middlewares/admin.middlewares');

MuseumsRoutes.get('/', getMuseums);
MuseumsRoutes.post('/', /* [isBasic], */ postMuseum);
MuseumsRoutes.patch('/:id', [isBasic], patchMuseum);
MuseumsRoutes.delete('/:id', [isAdmin], deleteMuseum);
/* MuseumsRoutes.patch(
  '/addAuthorToPainting/:id',
  [isBasic],
  upload.single('image'),
  addAuthorToPainting
); */

module.exports = MuseumsRoutes;
