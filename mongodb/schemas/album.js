const mongoose = require('mongoose');

const { log } = console;
const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

mongoose.model('Album', albumSchema);

log(':)');
