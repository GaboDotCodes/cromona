const { error } = console;
const verifyIdTokenAndAdmin = require('./functions/verifyIdTokenAndAdmin');
const addSticker = require('./functions/addSticker');
const addStickerToAlbum = require('./functions/addStickerToAlbum');
const getAlbumById = require('./functions/getAlbumById');

module.exports = {
  Mutation: {
    addSticker: async (_, { sticker }, context) => {
      try {
        const { authorization } = context.headers;
        await verifyIdTokenAndAdmin(authorization);
        const stickerReturn = await addSticker(sticker);
        await addStickerToAlbum(stickerReturn.album, stickerReturn.id);
        return stickerReturn;
      } catch (e) {
        error(e);
        return e;
      }
    },
  },
  Sticker: {
    async album({ album }) {
      try {
        const albumReturn = await getAlbumById(album);
        return albumReturn;
      } catch (e) {
        error(e);
        return e;
      }
    },
  },
};
