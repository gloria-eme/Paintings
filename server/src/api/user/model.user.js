const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    //provider: { type: String, required: true },
    //provider_id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favoriteMuseums: [{ type: mongoose.Schema.Types.ObjectId, ref: 'museums' }],
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

module.exports = mongoose.model('users', userSchema);
