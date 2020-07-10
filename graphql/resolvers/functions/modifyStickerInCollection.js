const Collection = require('../../../mongodb/schemas/Collection');

const modifyStickerInCollection = async (operationDetail, operation = 1) => {
  const { sticker, collection, user } = operationDetail;
  const conditionGt = operation === 1 ? -1 : 0;
  const collectionUpdated = await Collection.findOneAndUpdate(
    {
      _id: collection,
      user,
      'stickersCollection.amount': { $gt: conditionGt },
      'stickersCollection.sticker': sticker,
    },
    { $inc: { 'stickersCollection.$.amount': operation } },
    { new: true, useFindAndModify: true }
  ).populate('stickersCollection.sticker');
  const { stickersCollection } = collectionUpdated;
  const stickerDetailReturn = stickersCollection.find(async (detail) => detail.sticker === sticker);
  return stickerDetailReturn;
};

module.exports = modifyStickerInCollection;
