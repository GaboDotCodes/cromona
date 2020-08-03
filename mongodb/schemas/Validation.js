const { Schema, model } = require('mongoose');

const validationSchema = new Schema({
  utmCampaign: {
    type: String,
  },
  route: {
    type: String,
    require: true,
  },
  at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('Validation', validationSchema);
