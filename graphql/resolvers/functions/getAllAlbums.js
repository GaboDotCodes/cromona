const Album = require('../../../mongodb/schemas/Album');

const getAllAlbums = async () => {
  const allAlbums = await Album.find();
  return allAlbums;
};

module.exports = getAllAlbums;
