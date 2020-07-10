const Album = require('../../../mongodb/schemas/Album');

const addAlbumToReview = async (album) => {
  const { title, image, reviewRequestedBy } = album;
  const albumToSave = new Album({
    title,
    image,
    review: {
      toReview: true,
      reviewRequestedBy,
    },
  });
  const albumSaved = await albumToSave.save();
  return albumSaved;
};

module.exports = addAlbumToReview;
