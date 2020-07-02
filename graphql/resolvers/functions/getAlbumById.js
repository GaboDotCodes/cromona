const Album = require('../../../mongodb/schemas/Album');

const getAlbumById = async (album) => {
  const albumReturn = await Album.findById(album);
  return albumReturn;
};
module.exports = getAlbumById;
