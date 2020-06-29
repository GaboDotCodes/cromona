const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

const ratingSchema = new Schema({
  swap: {
    type: ObjectId,
    ref: 'Swap',
  },
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
  feedback: {
    type: String,
    maxlength: 300,
  },
});

module.exports = model('Rating', ratingSchema);
