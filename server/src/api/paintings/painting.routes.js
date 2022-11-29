const PaintingsRoutes = require('express').Router();

const upload = require('../../middlewares/file');
const {
  getPaintings,
  getPaintingByDate,
  postPainting,
  patchPainting,
  deletePainting,
  addAuthor,
} = require('./controller.painting');

PaintingsRoutes.get('/', getPaintings);
PaintingsRoutes.get('/:date', getPaintingByDate);
PaintingsRoutes.post('/', [isBasic], upload.single('image'), postPainting);
PaintingsRoutes.patch('/:id', [isBasic], upload.single('image'), patchPainting);
PaintingsRoutes.delete('/:id', [isAdmin], deletePainting);
PaintingsRoutes.put('/addauthortopainting', [isBasic], upload.single('image'), addAuthor);

module.exports = PaintingsRoutes;
