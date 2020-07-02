const Collection = require('../../../mongodb/schemas/Collection');

const getCollectionWithStickers = async (collectionId) => {
  const { stickersCollection } = await Collection.findById(collectionId).populate(
    'stickersCollection.sticker'
  );
  return stickersCollection;
};

module.exports = getCollectionWithStickers;
