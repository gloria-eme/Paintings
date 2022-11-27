const Painting = require('./model.painting');
const Author = require('../authors/model.author');
const { setError } = require('../../utils/error/handle.error');
const { deleteFile } = require('../../middlewares/delete-file');

const getPaintings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 5;
    const page = parseInt(req.query.page, 10) || 1;
    const paintings = await Painting.paginate(
      {},
      { limit, page }
    ); /* .populate('authors') */
    return res.json({
      status: 200,
      message: 'Recovered all paintings',
      data: { paintings },
    });
  } catch (error) {
    return next(setError(500, 'Fail to recover paintings'));
  }
};

const postPainting = async (req, res, next) => {
  try {
    const { authorId } = req.body;
    const author = await Author.findById(authorId);

    const paintingObject = { ...req.body };

    if (author) {
      paintingObject.author = author._id;
    }

    const newPainting = new Painting(paintingObject);

    if (req.file) {
      newPainting.image = req.file.path;
    }

    const newPaintingInDB = await newPainting.save();

    if (author) {
      author.paintings = author.paintings.concat(newPaintingInDB._id);
      await author.save();
    }

    return res.json({
      status: 201,
      message: 'Created Painting',
      data: { newPainting },
    });
  } catch (error) {
    return next(setError(500, error.message | 'Failed in painting post'));
  }
};

const patchPainting = async (req, res, next) => {
  try {
    const { id } = req.params;
    const editPainting = new Painting(req.body);
    editPainting._id = id;
    const paintingDB = await Painting.findByIdAndUpdate(id, editPainting);
    if (req.file) {
      deleteFile(paintingDB.image);
      editPainting.image = req.file.path;
    }
    if (!paintingDB) {
      return next('painting not found');
    }
    return res.status(200).json({
      new: editPainting,
      old: paintingDB,
    });
  } catch (error) {
    return next(setError(500, error.message | 'Failed in painting update'));
  }
};
const addAuthorToPainting = async (req, res, next) => {
  try {
    const { paintingId } = req.body;
    const { authorId } = req.body;
    const updatePainting = await Painting.findByIdAndUpdate(
      paintingId,
      { $push: { author: authorId } },
      { new: true }
    );
    return res.status(200).json(updatePainting);
  } catch (error) {
    return next(setError(500, error.message | 'Failed in painting update'));
  }
};

const deletePainting = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedPainting = await Painting.findByIdAndDelete(id);
    if (deletedPainting.image) {
      deleteFile(deletedPainting.image);
    }
    if (!deletedPainting) {
      return next(setError(404, 'Painting not found'));
    }
    return res.status(200).json({
      message: 'painting deleted',
      deletedPainting,
    });
  } catch (error) {
    return next(setError(500, error.message | 'Failed in painting deletion'));
  }
};

module.exports = {
  getPaintings,
  postPainting,
  patchPainting,
  deletePainting,
  addAuthorToPainting,
};
