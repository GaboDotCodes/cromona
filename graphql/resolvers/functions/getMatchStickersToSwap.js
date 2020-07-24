const Collection = require('../../../mongodb/schemas/Collection');
const User = require('../../../mongodb/schemas/User');
const Sticker = require('../../../mongodb/schemas/Sticker');
const mergeCollectionsArray = require('./mergeCollectionsArray');

const getMatchStickersToSwap = async (me, someone) => {
  const otherUser = await User.findById(someone);
  const { uid, collections, ratings, swaps } = otherUser;
  const myCollections = await Collection.find({ user: me });
  const someonesCollections = await Collection.find({ user: someone });
  const myAlbums = myCollections.map((myCollection) => myCollection.album);

  const collectionsMatch = someonesCollections.filter((collection) => {
    const filterReturn = myAlbums.reduce((includes, myAlbum) => {
      return JSON.stringify(myAlbum) === JSON.stringify(collection.album);
    }, false);
    return filterReturn;
  });

  if (collectionsMatch.length === 0) return null;

  const myCollectionsMerged = mergeCollectionsArray(myCollections);
  const collectionsMatchMerged = mergeCollectionsArray(collectionsMatch);

  const stickersIdsUsefulToMe = [];
  const stickersIdsUsefulToSomeone = [];

  myCollectionsMerged.forEach((myCollection) => {
    const someonesCollectionMatch = collectionsMatchMerged.find(
      (someonesCollection) =>
        JSON.stringify(someonesCollection.album) === JSON.stringify(myCollection.album)
    );

    myCollection.stickersCollection.forEach((stickerDetail, index) => {
      if (
        stickerDetail.amount === 0 &&
        someonesCollectionMatch.stickersCollection[index].amount >= 2
      ) {
        stickersIdsUsefulToMe.push(stickerDetail.sticker);
      }
      if (
        stickerDetail.amount >= 2 &&
        someonesCollectionMatch.stickersCollection[index].amount >= 0
      ) {
        stickersIdsUsefulToSomeone.push(stickerDetail.sticker);
      }
    });
  });

  const stickersUsefulToMe = await Sticker.find({ _id: { $in: stickersIdsUsefulToMe } });
  const stickersUsefulToSomeone = await Sticker.find({ _id: { $in: stickersIdsUsefulToSomeone } });
  const amountPosibleSwaps =
    stickersUsefulToMe.length >= stickersUsefulToSomeone.length
      ? stickersUsefulToSomeone.length
      : stickersUsefulToMe.length;
  if (amountPosibleSwaps === 0) return null;
  const returnData = {
    uid,
    collections,
    ratings,
    swaps,
    amountPosibleSwaps,
    stickersUsefulToMe,
    stickersUsefulToSomeone,
  };
  return returnData;
};

module.exports = getMatchStickersToSwap;
