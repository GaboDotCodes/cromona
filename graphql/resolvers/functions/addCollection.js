const Collection = require('../../../mongodb/schemas/Collection');
const Album = require('../../../mongodb/schemas/Album');

const addCollection = async (collection) => {
  const albumObj = await Album.findById(collection.album);
  const { stickers } = albumObj;
  const stickersCollection = stickers.map((sticker) => {
    return { sticker, amount: 0 };
  });
  const collectionToSave = new Collection({ ...collection, stickersCollection });
  const collectionSaved = await collectionToSave.save();
  return collectionSaved;
};

module.exports = addCollection;
