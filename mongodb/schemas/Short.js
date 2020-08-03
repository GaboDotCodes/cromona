const { Schema, model } = require('mongoose');
const shortid = require('shortid');
const { isURL } = require('validator');

const urlSchema = new Schema({
  longUrl: {
    type: String,
    required: true,
    validate: isURL,
  },
  shortUrl: {
    type: String,
    default: shortid.generate,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  clicks: [
    {
      type: Date,
    },
  ],
});

urlSchema.virtual('totalClicks').get(() => this.clicks.length)

module.exports = model('Short', urlSchema);
