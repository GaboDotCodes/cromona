const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const stickerSchema = new mongoose.Schema({});

mongoose.model('Sticker', stickerSchema);
