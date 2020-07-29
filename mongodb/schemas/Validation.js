const { Schema, model } = require('mongoose');

const stickerSchema = new Schema({
  route: {
    type: String,
    require: true,
  },
  at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('Validation', stickerSchema);
