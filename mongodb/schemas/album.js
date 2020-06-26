const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

const albumSchema = new Schema({});

module.exports = model('Album', albumSchema);
