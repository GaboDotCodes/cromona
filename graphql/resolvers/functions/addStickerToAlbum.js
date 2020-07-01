const Album = require('../../../mongodb/schemas/Album');

const addStickerToAlbum = async (album, sticker) => {
  const albumObj = await Album.findById(album);
  albumObj.stickers.push(sticker);
  await albumObj.save();
  return 'Ok';
};

module.exports = addStickerToAlbum;
