const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

const UserSchema = new Schema({});

module.exports = model('User', UserSchema);
