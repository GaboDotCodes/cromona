const Collection = require('../../../mongodb/schemas/Collection');

const modifyStickerInCollection = async (operationDetail, operation = 1) => {
  const { sticker, collection } = operationDetail;
  const stickersCollectionToUpdate = (await Collection.findById(collection)).stickersCollection;
  const stickerToUpdate = stickersCollectionToUpdate.find((stickerDetail) => {
    return JSON.stringify(stickerDetail.sticker) === JSON.stringify(sticker);
  });
  if (stickerToUpdate.amount === 0 && operation === -1)
    throw new Error(`You can't have negative amounts`);
  const collectionUpdated = await Collection.findOneAndUpdate(
    {
      _id: collection,
      'stickersCollection.sticker': sticker,
    },
    { $inc: { 'stickersCollection.$.amount': operation } },
    { new: true, useFindAndModify: true }
  ).populate('stickersCollection.sticker');
  const { stickersCollection } = collectionUpdated;
  const stickerDetailReturn = stickersCollection.find((detail) => detail.sticker.id === sticker);
  return stickerDetailReturn;
};

module.exports = modifyStickerInCollection;
