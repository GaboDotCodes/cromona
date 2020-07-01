const Sticker = require('../../../mongodb/schemas/Sticker');

const addSticker = async ({ album, number, title, image }) => {
  const stickerToSave = new Sticker({ album, number, title, image });
  const stickerSaved = await stickerToSave.save();
  return stickerSaved;
};

module.exports = addSticker;
