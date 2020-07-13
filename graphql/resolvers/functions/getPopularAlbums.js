const User = require('../../../mongodb/schemas/User');

const getPopularAlbums = async (location, ratio, unit) => {
  const { lat, lon } = location;
  let convertionToMt;
  if (unit === 'mi') {
    convertionToMt = 1609.34;
  } else if (unit === 'km') {
    convertionToMt = 1000;
  } else {
    throw new Error('getPopularAlbums: Invalid units');
  }
  const usersInRatio = await User.find({
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
