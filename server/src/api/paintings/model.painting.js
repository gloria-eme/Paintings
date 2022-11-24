const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const paintingsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    date: { type: String, required: true },
    author: [{ type: mongoose.Schema.Types.ObjectId, ref: 'authors' }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('paintings', paintingsSchema);
