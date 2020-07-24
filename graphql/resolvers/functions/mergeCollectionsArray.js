const mergeCollectionsArray = (collectionsArray) => {
  const checked = [];
  const collectionsArrayMergedWithNull = collectionsArray.map(
    (collectionMap, _index, collections) => {
      const filterReturn = checked.reduce((includes, myAlbum) => {
        return JSON.stringify(myAlbum) === JSON.stringify(collectionMap.album);
      }, false);

      if (filterReturn) return null;
      const thisAlbum = collectionMap.album;
      checked.push(thisAlbum);
      const collectionsSameAlbum = collections.filter(
        (collectionFilter) => JSON.stringify(collectionFilter.album) === JSON.stringify(thisAlbum)
      );
      if (collectionsSameAlbum.length === 1) return collectionMap;

      const { user, album } = collectionsSameAlbum[0];

      const stickersCollection = collectionsSameAlbum[0].stickersCollection.map(
        (stickerDetail, index) => {
          let amount = 0;
          for (let i = 0; i < collectionsSameAlbum.length; i += 1) {
            const amountToAdd = collectionsSameAlbum[i].stickersCollection[index].amount;
            amount += amountToAdd;
          }
          const { sticker } = stickerDetail;
          return { sticker, amount };
        }
      );

      const collectionMerged = { user, album, stickersCollection };

      return collectionMerged;
    }
  );
  const collectionsArrayMerged = collectionsArrayMergedWithNull.filter(
    (collection) => collection !== null
  );
  return collectionsArrayMerged;
};

module.exports = mergeCollectionsArray;
