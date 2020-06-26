const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

const stickerTypeSchema = new mongoose.Schema({});

module.exports = model('StickerType', stickerTypeSchema);
