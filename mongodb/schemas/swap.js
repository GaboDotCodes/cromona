const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

const swapSchema = new mongoose.Schema({});

module.exports = model('Swap', swapSchema);
