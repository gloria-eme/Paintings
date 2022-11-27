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
PaintingsRoutes.post('/', upload.single('image'), postPainting);
PaintingsRoutes.patch('/:id', upload.single('image'), patchPainting);
PaintingsRoutes.delete('/:id', deletePainting);
PaintingsRoutes.put('/addauthortopainting', upload.single('image'), addAuthor);

module.exports = PaintingsRoutes;
