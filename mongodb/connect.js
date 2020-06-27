const mongoose = require('mongoose');

const { MONGO_URI } = process.env;
const { log, error } = console;

const connect = () => {
  mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    log('DB Connected');
  });
  const db = mongoose.connection;

  db.on('error', error.bind(console, 'Connection error [Mongo]'));
  db.once('open', () => {
    log('Connection success [Mongo].');
  });
  return db;
};

module.exports = {
  connect,
};
