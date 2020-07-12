const { Schema } = require('mongoose');

const pointSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

module.exports = pointSchema;
