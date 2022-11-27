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

const getMuseumsByCity = async (req, res, next) => {
	const {city} = req.params;
	try {
		const museumsByCity = await Museum.find({ city: city }).populate('paintings');
		return res.status(200).json(museumsByCity);
	} catch (err) {
		return next(setError(500, 'Fail to recover museums by city'));
	}
};

const postMuseum = async (req, res, next) => {
  try {
    const newMuseum = new Museum(req.body);

    await newMuseum.save();
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
  getMuseumsByCity,
  postMuseum,
  patchMuseum,
  deleteMuseum,
};
