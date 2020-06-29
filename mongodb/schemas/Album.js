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
  editions: [
    {
      type: ObjectId,
      ref: 'Edition',
    },
  ],
});

module.exports = model('Album', albumSchema);
