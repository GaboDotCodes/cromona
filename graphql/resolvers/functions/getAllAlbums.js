const Album = require('../../../mongodb/schemas/Album');

const getAllAlbums = async () => {
  const allAlbums = await Album.find({ 'review.toReview': false });
  return allAlbums;
};

module.exports = getAllAlbums;
