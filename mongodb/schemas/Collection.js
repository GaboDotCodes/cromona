const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

const collectionSchema = new Schema({
  user: {
    type: ObjectId,
    ref: 'User',
  },
  album: {
    type: ObjectId,
    ref: 'Album',
  },
  stickersCollection: [
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
  at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('Collection', collectionSchema);
