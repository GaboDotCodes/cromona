const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

const stickerConditionSchema = new Schema({});

module.exports = model('StickerCondition', stickerConditionSchema);
