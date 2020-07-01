const Sticker = require('../../../mongodb/schemas/Sticker');

const getStickerByAlbumId = async (albumId) => {
  const stickersReturn = await Sticker.find({ album: albumId });
  return stickersReturn;
};

module.exports = getStickerByAlbumId;
