const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

const interestSchema = new Schema({
  by: {
    type: ObjectId,
    ref: 'User',
  },
  to: {
    type: ObjectId,
    ref: 'User',
  },
  at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('Interest', interestSchema);
