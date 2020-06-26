const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const swapSchema = new mongoose.Schema({});

mongoose.model('Swap', swapSchema);
