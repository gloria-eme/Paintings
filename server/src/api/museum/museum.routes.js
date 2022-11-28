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
MuseumsRoutes.post('/', postMuseum);
MuseumsRoutes.patch('/:id', patchMuseum);
MuseumsRoutes.delete('/:id', deleteMuseum);

module.exports = MuseumsRoutes;
