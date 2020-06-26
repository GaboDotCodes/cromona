const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const stickerType = new mongoose.Schema({});

mongoose.model('StickerType', stickerType);
