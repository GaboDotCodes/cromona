const { Schema, model } = require('mongoose');
const { isURL } = require('validator');

const { ObjectId } = Schema.Types;

const stickerSchema = new Schema({
  album: {
    type: ObjectId,
    ref: 'Edition',
    require: true,
  },
  number: {
    type: Number,
    require: true,
  },
  tittle: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    validate: isURL,
  },
  compatibleWith: [
    {
      type: ObjectId,
      ref: 'Sticker',
    },
  ],
  categories: [
    {
      title: {
        type: String,
      },
      optional: {
        type: Boolean,
      },
      options: [
        {
          type: ObjectId,
          ref: 'StickerCategory',
        },
      ],
    },
  ],
});

module.exports = model('Sticker', stickerSchema);
