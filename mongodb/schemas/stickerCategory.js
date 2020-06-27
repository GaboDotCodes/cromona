const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

const stickerCategorySchema = new Schema({});

module.exports = model('StickerCategory', stickerCategorySchema);
