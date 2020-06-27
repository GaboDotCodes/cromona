const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

const pointSchema = new Schema({
  type: {
    type: String,
    enum: ['Point'],
  },
  coordinates: {
    type: [Number],
    index: '2dsphere',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserSchema = new Schema({
  username: {
    type: String,
    match: [/^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){4,18}[a-zA-Z0-9]$/g, 'No match with RegEx'],
    unique: true,
    require: true,
  },
  uidFirebase: {
    type: String,
    unique: true,
    require: true,
  },
  colections: [
    {
      editionAlbumId: {
        type: ObjectId,
        ref: 'Edition',
      },
      stickersColection: [
        {
          stickerId: {
            type: ObjectId,
            ref: 'Sticker',
          },
          categories: [
            {
              type: ObjectId,
            },
          ],
          condition: {
            type: String,
            enum: ['Luxury packaging', 'Empaque normal', 'Normal', 'Recuperada', 'Desgastada'],
          },
        },
      ],
    },
  ],
  ratings: [
    {
      swap: {
        type: ObjectId,
        ref: 'Swap',
      },
      leftBy: {
        type: ObjectId,
        ref: 'User',
      },
      coherence: {
        type: Number,
        min: 0,
        max: 5,
      },
      punctuality: {
        type: Number,
        min: 0,
        max: 5,
      },
      feedback: {
        type: String,
        maxlength: 300,
      },
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
    required: true,
  },
});

module.exports = model('User', UserSchema);
