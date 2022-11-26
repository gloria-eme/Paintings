const PaintingsRoutes = require('express').Router();
const upload = require('../../middlewares/file');
const {
  getPaintings,
  postPainting,
  patchPainting,
  deletePainting,
  addAuthorToPainting,
} = require('./controller.painting');

const { isBasic } = require('../../middlewares/basic.middlewares');
const { isAdmin } = require('../../middlewares/admin.middlewares');

PaintingsRoutes.get('/', getPaintings);
PaintingsRoutes.post(
  '/',
  /*  [isBasic], */ upload.single('image'),
  postPainting
);
PaintingsRoutes.patch(
  '/:id',
  /* [isBasic], */ upload.single('image'),
  patchPainting
);
PaintingsRoutes.delete('/:id', /* [isAdmin],  */ deletePainting);
PaintingsRoutes.put(
  '/addauthortopainting',
  [isBasic],
  upload.single('image'),
  addAuthorToPainting
);

module.exports = PaintingsRoutes;
