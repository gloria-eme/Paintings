const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const authorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    country: { type: String, required: true },
    lifedate: { type: String, required: true },
    paintings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'paintings' }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('authors', authorSchema);
