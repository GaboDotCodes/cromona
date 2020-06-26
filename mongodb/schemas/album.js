const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

const albumSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  editions: [
    {
      type: ObjectId,
      ref: 'Edition',
    },
  ],
});

module.exports = model('Album', albumSchema);
