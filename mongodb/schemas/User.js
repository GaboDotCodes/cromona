const { Schema, model } = require('mongoose');
const pointSchema = require('./pointSchema');

const { ObjectId } = Schema.Types;

const userSchema = new Schema({
  uid: {
    type: String,
    unique: true,
    require: true,
  },
  collections: [
    {
      type: ObjectId,
      ref: 'Collection',
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
    type: pointSchema,
    index: '2dsphere',
  },
  lastLocationUpdate: {
    type: Date,
  },
});

module.exports = model('User', userSchema);
