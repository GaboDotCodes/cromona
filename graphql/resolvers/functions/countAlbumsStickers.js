const Album = require('../../../mongodb/schemas/Album');

const countAlbumsStickers = async (id) => {
  const albumObj = await Album.findById(id);
  const stickersCountedReturn = albumObj.stickers.length;
  return stickersCountedReturn;
};

module.exports = countAlbumsStickers;
