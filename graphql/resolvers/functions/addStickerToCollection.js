const Collection = require('../../../mongodb/schemas/Collection');

const addStickerToCollection = async (operationDetail, operation = 1) => {
  const { sticker, collection } = operationDetail;
  const collectionUpdated = await Collection.findOneAndUpdate(
    { _id: collection, 'stickersCollection.sticker': sticker },
    { $inc: { 'stickersCollection.$.amount': operation } },
    { new: true, useFindAndModify: true }
  ).populate('stickersCollection.sticker');
  const { stickersCollection } = collectionUpdated;
  const stickerDetailReturn = stickersCollection.find(async (detail) => detail.sticker === sticker);
  return stickerDetailReturn;
};

module.exports = addStickerToCollection;
