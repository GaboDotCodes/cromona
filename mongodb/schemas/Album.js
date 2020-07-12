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
    requestAt: {
      type: Date,
    },
  },
  approvedBy: {
    type: ObjectId,
    ref: 'User',
  },
});

albumSchema.pre('save', () => {
  this.review.requestAt = this.review.toReview ? Date.now() : null;
});

module.exports = model('Album', albumSchema);
