const Sticker = require('../../../mongodb/schemas/Sticker');

const getStickersByAlbumId = async (albumId) => {
  const stickersReturn = await Sticker.find({ album: albumId });
  return stickersReturn;
};

module.exports = getStickersByAlbumId;
