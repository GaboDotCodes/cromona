const User = require('../../../mongodb/schemas/User');
const getConvertionFactors = require('./getConvertionFactors');

const getPeoplePossibleSwaps = async (location, ratio, unit, userId) => {
  const { lat, lon } = location;
  const { convertionToMt } = getConvertionFactors(unit);
  const me = await User.findById(userId).populate({
    path: 'collections',
    populate: { path: 'album' },
  });
  const albumsInCollectionsNoToReview = me.collections
    .filter((collection) => {
      return collection.album.review.toReview === false;
    })
    .map((collection) => {
      return collection.album.id;
    });
  const allAlbumsNoRepeat = [...new Set(albumsInCollectionsNoToReview)];

  const usersInRatio = await User.find({
    _id: { $ne: userId },
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
  const usersIds = usersInRatio.map((user) => user.id);
  // TO BE CONTINUE
  return usersInRatio;
};

module.exports = getPeoplePossibleSwaps;
