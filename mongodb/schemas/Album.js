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
  stickers: [
    {
      type: ObjectId,
      ref: 'Sticker',
    },
  ],
  review: {
    toReview: {
      type: Boolean,
      default: false,
    },
    reviewRequestedBy: {
      type: ObjectId,
      ref: 'User',
    },
  },
  approvedBy: {
    type: ObjectId,
    ref: 'User',
  },
});

module.exports = model('Album', albumSchema);
