const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

const userSchema = new Schema({
  uid: {
    type: String,
    unique: true,
    require: true,
  },
  albums: [
    {
      type: ObjectId,
      ref: 'Album',
    },
  ],
  colections: [
    {
      type: ObjectId,
      ref: 'Colection',
    },
  ],
  ratings: [
    {
      type: ObjectId,
      ref: 'Rating',
    },
  ],
  swaps: [
    {
      type: ObjectId,
      ref: 'Swap',
    },
  ],
  lastLocation: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
    lastUpdate: {
      type: Date,
      default: Date.now,
    },
  },
});

module.exports = model('User', userSchema);
