const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const stickerConditionSchema = new mongoose.Schema({});

mongoose.model('StickerCondition', stickerConditionSchema);
