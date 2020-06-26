const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const editorialSchema = new mongoose.Schema({});

mongoose.model('Editorial', editorialSchema);
