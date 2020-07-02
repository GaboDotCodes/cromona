const Album = require('../../../mongodb/schemas/Album');

const addAlbum = async (album) => {
  const albumToSave = new Album(album);
  const albumSaved = await albumToSave.save();
  return albumSaved;
};

module.exports = addAlbum;
