const Author = require('./model.author');
const { setError } = require('../../utils/error/handle.error');

const getAuthors = async (req, res, next) => {
  try {
    const authors = await Author.find().populate('paintings');
    return res.json({
      status: 200,
      message: 'Recovered all authors',
      data: { authors },
    });
  } catch (error) {
    return next(setError(500, 'Fail to recover authors'));
  }
};

const postAuthor = async (req, res, next) => {
  try {
    const newAuthor = new Author(req.body);
    /*  if (req.file) {
      newAuthor.image = req.file.path;
    } */
    const newAuthorInDB = await newAuthor.save();
    return res.json({
      status: 201,
      message: 'Created Author',
      data: { newAuthor },
    });
  } catch (error) {
    return next(setError(500, error.message | 'Failed in author post'));
  }
};

const patchAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const editAuthor = new Author(req.body);
    editAuthor._id = id;
    const authorDB = await Author.findByIdAndUpdate(id, editAuthor);
    /* if (req.file) {
      deleteFile(authorDB.image);
      editauthor.image = req.file.path;
    } */
    if (!authorDB) {
      return next('author not found');
    }
    return res.status(200).json({
      new: editAuthor,
      old: authorDB,
    });
  } catch (error) {
    return next(setError(500, error.message | 'Failed in author update'));
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
const deleteAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedAuthor = await Author.findByIdAndDelete(id);
    /* if (deletedAuthor.image) {
      deleteFile(deletedAuthor.image);
    } */
    if (!deletedAuthor) {
      return next(setError(404, 'author not found'));
    }
    return res.status(200).json({
      message: 'author deleted',
      deletedAuthor,
    });
  } catch (error) {
    return next(setError(500, error.message | 'Failed in author deletion'));
  }
};

module.exports = {
  getAuthors,
  patchAuthor,
  postAuthor,
  deleteAuthor,
};
