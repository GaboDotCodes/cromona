const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

const swapSchema = new Schema({});

module.exports = model('Swap', swapSchema);
