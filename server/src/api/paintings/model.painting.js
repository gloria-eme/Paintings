const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const moongosePaginate = require('mongoose-paginate-v2');

const paintingsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String },
    date: { type: String, required: true },
    author: [{ type: mongoose.Schema.Types.ObjectId, ref: 'authors' }],
  },
  {
    timestamps: true,
  }
);
paintingsSchema.plugin(moongosePaginate);

module.exports = mongoose.model('paintings', paintingsSchema);
