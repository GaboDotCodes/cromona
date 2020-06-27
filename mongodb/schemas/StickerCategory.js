const { Schema, model } = require('mongoose');
const { isURL } = require('validator');

const stickerCategorySchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    validate: isURL,
  },
});

module.exports = model('StickerCategory', stickerCategorySchema);
