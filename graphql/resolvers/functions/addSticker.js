const Sticker = require('../../../mongodb/schemas/Sticker');

const addSticker = async (sticker) => {
  const stickerToSave = new Sticker(sticker);
  const stickerSaved = await stickerToSave.save();
  return stickerSaved;
};

module.exports = addSticker;
