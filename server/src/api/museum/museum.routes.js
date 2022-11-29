const MuseumsRoutes = require('express').Router();

const {
  getMuseums,
  getMuseumsByCity,
  patchMuseum,
  postMuseum,
  deleteMuseum,
} = require('./controller.museum');

MuseumsRoutes.get('/', getMuseums);
MuseumsRoutes.get('/:city', getMuseumsByCity);
MuseumsRoutes.post('/', [isBasic], postMuseum);
MuseumsRoutes.patch('/:id', [isBasic], patchMuseum);
MuseumsRoutes.delete('/:id', [isAdmin], deleteMuseum);

module.exports = MuseumsRoutes;
