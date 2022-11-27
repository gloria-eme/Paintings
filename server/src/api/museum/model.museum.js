const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const museumSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    paintings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'paintings' }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('museums', museumSchema);
