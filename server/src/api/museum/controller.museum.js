const Museum = require('./model.museum');
const { setError } = require('../../utils/error/handle.error');

const getMuseums = async (req, res, next) => {
  try {
    const museums = await Museum.find().populate('paintings');
    return res.json({
      status: 200,
      message: 'Recovered all museums',
      data: { museums },
    });
  } catch (error) {
    return next(setError(500, 'Fail to recover museums'));
  }
};

const postMuseum = async (req, res, next) => {
  try {
    const newMuseum = new Museum(req.body);

    const newMuseumInDB = await newMuseum.save();
    return res.json({
      status: 201,
      message: 'Created Museum',
      data: { newMuseum },
    });
  } catch (error) {
    return next(setError(500, error.message | 'Failed in museum post'));
  }
};

const patchMuseum = async (req, res, next) => {
  try {
    const { id } = req.params;
    const editMuseum = new Museum(req.body);
    editMuseum._id = id;
    const museumDB = await Museum.findByIdAndUpdate(id, editMuseum);
    if (!museumDB) {
      return next('museum not found');
    }
    return res.status(200).json({
      new: editMuseum,
      old: museumDB,
    });
  } catch (error) {
    return next(setError(500, error.message | 'Failed in museum update'));
  }
};
/* const addAuthorToPainting = async (req, res, next) => {
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
 */
const deleteMuseum = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedMuseum = await Museum.findByIdAndDelete(id);
    if (!deletedMuseum) {
      return next(setError(404, 'museum not found'));
    }
    return res.status(200).json({
      message: 'museum deleted',
      deletedMuseum,
    });
  } catch (error) {
    return next(setError(500, error.message | 'Failed in museum deletion'));
  }
};

module.exports = {
  getMuseums,
  postMuseum,
  patchMuseum,
  deleteMuseum,
};