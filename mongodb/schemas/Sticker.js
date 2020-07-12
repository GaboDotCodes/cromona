const { Schema, model } = require('mongoose');
const { isURL } = require('validator');

const { ObjectId } = Schema.Types;

const stickerSchema = new Schema({
  album: {
    type: ObjectId,
    ref: 'Album',
    require: true,
  },
  number: {
    type: Number,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    validate: isURL,
  },
  approvedBy: {
    type: ObjectId,
    ref: 'User',
  },
});

module.exports = model('Sticker', stickerSchema);
