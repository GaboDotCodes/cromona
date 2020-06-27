const { Schema, model } = require('mongoose');
const { isURL } = require('validator');

const { ObjectId } = Schema.Types;

const stickerSchema = new Schema({
  album: {
    type: ObjectId,
    ref: 'Edition',
  },
  number: {
    type: Number,
    require: true,
    unique: true,
  },
  tittle: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
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
          ref: 'Category',
        },
      ],
    },
  ],
});

module.exports = model('Sticker', stickerSchema);
