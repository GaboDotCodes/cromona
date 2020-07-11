const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

const ratingSchema = new Schema({
  swaps: [
    {
      type: ObjectId,
      ref: 'Swap',
    },
  ],
  to: {
    type: ObjectId,
    ref: 'User',
  },
  by: {
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
  score: {
    type: Number,
    min: 0,
    max: 5,
  },
  feedback: {
    type: String,
    maxlength: 300,
  },
  at: {
    type: Date,
    default: Date.now,
  },
});

function preSaveRatingSchema() {
  this.score = (this.coherence + this.punctuality) / 2;
}

ratingSchema.pre('save', preSaveRatingSchema);

module.exports = model('Rating', ratingSchema);
