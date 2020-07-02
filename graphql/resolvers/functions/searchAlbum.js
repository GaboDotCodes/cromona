const Album = require('../../../mongodb/schemas/Album');

const searchAlbum = async (searchTerm) => {
  const regexSearchTerm = new RegExp(`${searchTerm}`, 'i');
  const albumsReturn = await Album.find({
    title: {
      $regex: regexSearchTerm,
    },
  });
  return albumsReturn;
};

module.exports = searchAlbum;
