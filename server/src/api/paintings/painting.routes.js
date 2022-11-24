const PaintingsRoutes = require('express').Router();
const upload = require('../../middlewares/file');
const {
  getPaintings,
  postPainting,
  patchPainting,
  deletePainting,
  addAuthorToPainting,
} = require('./controller.painting');

const { isAuth } = require('../../middlewares/auth.middlewares');

PaintingsRoutes.get('/', getPaintings);
PaintingsRoutes.post('/', [isAuth], upload.single('image'), postPainting);
PaintingsRoutes.patch('/:id', [isAuth], upload.single('image'), patchPainting);
PaintingsRoutes.delete('/:id', deletePainting);
PaintingsRoutes.put(
  '/addauthortopainting',
  [isAuth],
  upload.single('image'),
  addAuthorToPainting
);

module.exports = PaintingsRoutes;
