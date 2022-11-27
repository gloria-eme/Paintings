const MuseumsRoutes = require('express').Router();

const {
  getMuseums,
  patchMuseum,
  postMuseum,
  deleteMuseum,
} = require('./controller.museum');

MuseumsRoutes.get('/', getMuseums);
MuseumsRoutes.post('/', postMuseum);
MuseumsRoutes.patch('/:id', patchMuseum);
MuseumsRoutes.delete('/:id', deleteMuseum);

module.exports = MuseumsRoutes;
