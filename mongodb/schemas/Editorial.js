const { Schema, model } = require('mongoose');
const { isURL } = require('validator');

const { ObjectId } = Schema.Types;

const editorialSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
    validate: isURL,
  },
  albums: [
    {
      type: ObjectId,
      ref: 'Edition',
    },
  ],
});

module.exports = model('Editorial', editorialSchema);
