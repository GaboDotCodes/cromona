const Album = require('../../../mongodb/schemas/Album');

const addAlbum = async ({ title, image, launchedAt, amountStickers }) => {
  const albumToSave = new Album({ title, image, launchedAt, amountStickers });
  const albumSaved = await albumToSave.save();
  return albumSaved;
};

module.exports = addAlbum;
