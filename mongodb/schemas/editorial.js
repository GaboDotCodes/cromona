const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

const editorialSchema = new Schema({});

module.exports = model('Editorial', editorialSchema);
