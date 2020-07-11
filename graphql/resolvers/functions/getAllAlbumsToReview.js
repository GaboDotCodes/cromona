const Album = require('../../../mongodb/schemas/Album');

const getAllAlbumsToReview = async () => {
  const albumsToReviewReturn = await Album.find({ 'review.toReview': true });
  return albumsToReviewReturn;
};

module.exports = getAllAlbumsToReview;
