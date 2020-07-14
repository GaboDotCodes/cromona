const User = require('../../../mongodb/schemas/User');
const getConvertionFactors = require('./getConvertionFactors');

const getPopularAlbums = async (location, ratio, unit) => {
  const { lat, lon } = location;
  let ratioParam = ratio;
  let unitParam = unit;
  if (typeof ratio === 'undefined' && typeof unit === 'undefined') {
    ratioParam = 500;
    unitParam = 'km';
  }
  const { convertionToMt } = getConvertionFactors(unitParam);
  const usersInRatio = await User.find({
    lastLocation: {
      $nearSphere: {
        $geometry: {
          type: 'Point',
          coordinates: [lon, lat],
        },
        $maxDistance: ratioParam * convertionToMt,
      },
    },
  }).populate({
    path: 'collections',
    populate: { path: 'album' },
  });
  const allAlbums = usersInRatio
    .map((user) => {
      return user.collections.map((collection) => {
        return collection.album;
      });
    })
    .flat();
  const allApprovedAlbums = allAlbums.filter((album) => {
    return album.review.toReview === false;
  });
  const allAlbumsNoRepeat = [...new Set(allApprovedAlbums)];
  return allAlbumsNoRepeat;
};

module.exports = getPopularAlbums;
