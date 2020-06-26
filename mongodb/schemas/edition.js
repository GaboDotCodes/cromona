const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

const editionSchema = new Schema({});

module.exports = model('Edition', editionSchema);
