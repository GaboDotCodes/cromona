const Collection = require('../../../mongodb/schemas/Collection');

const getCollectionById = async (collectionId) => {
  const collectionReturn = await Collection.findById(collectionId);
  return collectionReturn;
};

module.exports = getCollectionById;
