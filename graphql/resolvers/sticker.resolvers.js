const { error } = console;
const addSticker = require('./functions/addSticker');
const addStickerToAlbum = require('./functions/addStickerToAlbum');

module.exports = {
  Mutation: {
    addSticker: async (_, { sticker }) => {
      try {
        const stickerReturn = await addSticker(sticker);
        await addStickerToAlbum(stickerReturn.album, stickerReturn.id);
        return stickerReturn;
      } catch (e) {
        error(e);
        return e;
      }
    },
  },
};
