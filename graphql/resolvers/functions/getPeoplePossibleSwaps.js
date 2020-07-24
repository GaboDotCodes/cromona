const User = require('../../../mongodb/schemas/User');
const getConvertionFactors = require('./getConvertionFactors');
const getMatchStickersToSwap = require('./getMatchStickersToSwap');

const getPeoplePossibleSwaps = async (location, ratio, unit, myId) => {
  const { lat, lon } = location;
  const { convertionToMt } = getConvertionFactors(unit);
  const meMyCollectionsAndMyAlbums = await User.findById(myId).populate({
    path: 'collections',
    populate: { path: 'album' },
  });
  const myAlbumsNoToReview = meMyCollectionsAndMyAlbums.collections
    .filter((collection) => {
      return collection.album.review.toReview === false;
    })
    .map((collection) => {
      return collection.album.id;
    });
  const allAlbumsNoRepeat = [...new Set(myAlbumsNoToReview)];
  const usersAroundWithMyAlbums = await User.find({
    _id: { $ne: myId },
    lastLocation: {
      $nearSphere: {
        $geometry: {
          type: 'Point',
          coordinates: [lon, lat],
        },
        $maxDistance: ratio * convertionToMt,
      },
    },
  }).populate({
    path: 'collections',
    match: {
      album: {
        $in: allAlbumsNoRepeat,
      },
    },
  });
  const usersIds = usersAroundWithMyAlbums.map((user) => user.id);

  const userPromises = await usersIds.map(async (someoneId) => {
    const userDetail = await getMatchStickersToSwap(myId, someoneId);
    return userDetail;
  });

  const userWithPossibleSwapsWithNull = await Promise.all(userPromises);

  const userWithPossibleSwaps = userWithPossibleSwapsWithNull.filter((user) => user !== null);

  return userWithPossibleSwaps;
};

module.exports = getPeoplePossibleSwaps;
