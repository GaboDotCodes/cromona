const Sticker = require('../../../mongodb/schemas/Sticker');

const getStickerByAlbumIb = async (albumId) => {
  const stickersReturn = await Sticker.find({ album: albumId });
  return stickersReturn;
};

module.exports = getStickerByAlbumIb;
