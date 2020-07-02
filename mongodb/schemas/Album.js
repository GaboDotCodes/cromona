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
});

module.exports = model('Album', albumSchema);
