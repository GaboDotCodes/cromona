const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

const colectionSchema = new Schema({
  userId: {
    type: ObjectId,
    ref: 'User',
  },
  albumId: {
    type: ObjectId,
    ref: 'Album',
  },
  stickersColection: [
    {
      stickerId: {
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
