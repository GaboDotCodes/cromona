const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const editionSchema = new mongoose.Schema({});

mongoose.model('Edition', editionSchema);
