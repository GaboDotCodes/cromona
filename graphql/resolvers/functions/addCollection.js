const Collection = require('../../../mongodb/schemas/Collection');

const addCollection = async (collection) => {
  const collectionToSave = new Collection({ ...collection });
  const collectionSaved = await collectionToSave.save();
  return collectionSaved;
};

module.exports = addCollection;
