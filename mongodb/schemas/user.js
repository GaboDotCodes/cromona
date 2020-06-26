const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({});

mongoose.model('User', userSchema);
