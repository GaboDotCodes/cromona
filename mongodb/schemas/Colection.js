const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

const colectionSchema = new Schema({
  user: {
    type: ObjectId,
    ref: 'User',
  },
  album: {
    type: ObjectId,
    ref: 'Album',
  },
  stickersColection: [
    {
      sticker: {
        type: ObjectId,
        ref: 'Sticker',
      },
      amount: {
        type: Number,
      },
    },
  ],
});

module.exports = model('Colection', colectionSchema);
