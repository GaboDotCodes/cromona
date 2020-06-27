const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

const stickerTypeSchema = new Schema({});

module.exports = model('StickerType', stickerTypeSchema);
