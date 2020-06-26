const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

const stickerSchema = new mongoose.Schema({});

module.exports = model('Swap', swapSchema);
