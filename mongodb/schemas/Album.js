const { Schema, model } = require('mongoose');
const { isURL } = require('validator');

const { ObjectId } = Schema.Types;

const albumSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    validate: isURL,
  },
  launchedAt: {
    type: Date,
  },
  amountStickers: {
    type: Number,
    required: true,
  },
  stickers: [
    {
      type: ObjectId,
      ref: 'Sticker',
    },
  ],
  users: [
    {
      type: ObjectId,
      ref: 'User',
    },
  ],
  swaps: [
    {
      type: ObjectId,
      ref: 'Swap',
    },
  ],
});

module.exports = model('Album', albumSchema);
